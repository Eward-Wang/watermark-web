/**
 * 生成网站水印
 * @author Eward
 * 18/08/31
 */
export type watermarkSettingType = {
  /**
   * 包裹dom的id
   * @author Eward
   * 18/08/31
   */
  id?: string;
  /**
   * 水印显示的字
   * @author Eward
   * 18/08/31
   */
  text: string;
  /**
   * 横向之间间距
   * @author Eward
   * 18/08/31
   */
  gutterX?: number;
  /**
   * 纵向之间间距
   * @author Eward
   * 18/08/31
   */
  gutterY?: number;
  /**
   * 字体大小
   * @author Eward
   * 18/08/31
   */
  size?: number;
  /**
   * 透明度(0-1)
   * @author Eward
   * 18/08/31
   */
  alpha?: number;
  /**
   * 单个水印长度
   * @author Eward
   * 18/08/31
   */
  width?: number;
  /**
   * 水印倾斜度数
   * @author Eward
   * 18/08/31
   */
  angle?: number;
};

class Watermark {
  private setting: watermarkSettingType = null;
  private wrapper: HTMLElement = null;
  private update = this.debounce(this.gWatermarkDOM, 100).bind(this);
  constructor(setting: watermarkSettingType) {
    this.setting = {
      id: "watermark-web",
      text: "",
      gutterX: 15,
      gutterY: 15,
      size: 15,
      alpha: 0.35,
      width: 200,
      angle: 15,
      ...setting
    };
  }
  public init = () => (
    this.gWrapperDOM().gWatermarkDOM(),
    window.addEventListener("resize", this.update)
  );
  public destory(): void {
    window.removeEventListener("resize", this.update);
    const el = document.getElementById(this.setting.id);
    if (!el) return;
    el.innerHTML = "";
  }
  public change = (param: Partial<watermarkSettingType>): void => (
    (this.setting = { ...this.setting, ...param }), this.update()
  );

  /**
   * 生成包裹层
   * @author Eward
   * 18/08/31
   */
  private gWrapperDOM(): this {
    const { id } = this.setting;
    this.wrapper = document.getElementById(id);

    if (!this.wrapper) {
      this.wrapper = document.createElement("div");
      this.wrapper.setAttribute("id", id);
      this.wrapper.style.cssText = `
        pointer-events: none;
        position: fixed;
        top: 0;
        z-index: 9999;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: space-around;
        align-content: space-around;
        flex-wrap: wrap;
    `;
      document.body.appendChild(this.wrapper);
    }
    return this;
  }
  /**
   * 计算生成个数
   * @author Eward <ewardwang@126.com>
   * 18/09/16
   */
  private calcTotal(): number {
    // --------- 取出屏幕宽高 --------- created at 18.08.31 -- by Eward
    const max_width = Math.max(
      document.body.scrollWidth,
      document.body.clientWidth
    );
    const max_height = Math.max(
      document.body.scrollHeight,
      document.body.clientHeight
    );
    // --------- 计算出经过旋转后的水印实际高度 --------- created at 18.08.31 -- by Eward
    const height =
      Math.cos(this.setting.angle) * this.setting.size +
      Math.sin(this.setting.angle) * this.setting.width;

    // --------- 计算能生成多少个水印 --------- created at 18.08.31 -- by Eward
    const total =
      Math.ceil(max_height / (height + (this.setting.gutterY << 1))) *
      Math.ceil(max_width / (this.setting.width + (this.setting.gutterX << 1)));
    return total;
  }
  /**
   * 循环生成每个水印dom
   * @author Eward
   * 18/08/31
   */
  private gWatermarkDOM() {
    const total = this.calcTotal();

    let html = "";
    for (let i = 1; i <= total; i++) {
      html += `
       <div style="transform: rotate(-${this.setting.angle}deg);width: ${
        this.setting.width
      }px;margin: ${this.setting.gutterY}px ${
        this.setting.gutterX
      }px;opacity: ${this.setting.alpha}">
        ${this.setting.text}
       </div>
      `;
    }
    this.wrapper.innerHTML = html;
  }
  /**
   * debounce
   * @author Eward <ewardwang@126.com>
   * 18/09/16
   */
  private debounce(fn: Function, time: number) {
    let last: NodeJS.Timeout;
    return function() {
      const ctx = this,
        args = arguments;
      clearTimeout(last);
      last = setTimeout(function() {
        fn.apply(ctx, args);
      }, time);
    };
  }
}

export default Watermark;
