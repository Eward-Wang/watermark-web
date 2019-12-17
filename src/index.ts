import { isObject, calcTotalNum, debounce } from "./util";

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
  /**
   * 更新频率
   * @author Eward <ewardwang@126.com>
   * @since 19/12/17
   */
  debounce?: 100;
};

class Watermark {
  private setting: watermarkSettingType = null;
  private wrapper: HTMLElement = null;
  private update = debounce(this.gWatermarkDOM, this.setting.debounce).bind(
    this
  );
  constructor(setting?: watermarkSettingType) {
    this.setting = {
      id: "watermark-web",
      text: "",
      gutterX: 15,
      gutterY: 15,
      size: 15,
      alpha: 0.35,
      width: 200,
      angle: 15,
      debounce: 100,
      ...((isObject(setting) && setting) || {})
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
  public change = (param?: Partial<watermarkSettingType>): void => {
    if (!isObject(param)) return;
    this.setting = { ...this.setting, ...param };
    this.update();
  };
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
  private gWatermarkDOM() {
    if (!this.wrapper) {
      this.gWrapperDOM();
    }
    const total = calcTotalNum(
      Math.max(document.body.scrollWidth, document.body.clientWidth),
      Math.max(document.body.scrollHeight, document.body.clientHeight),
      this.setting.width,
      this.setting.size,
      this.setting.angle,
      this.setting.gutterX,
      this.setting.gutterY
    );

    let html = "";
    for (let i = 1; i <= total; i++) {
      html += `
       <div style="transform: rotate(-${this.setting.angle}deg);width: ${this.setting.width}px;margin: ${this.setting.gutterY}px ${this.setting.gutterX}px;opacity: ${this.setting.alpha}">
        ${this.setting.text}
       </div>
      `;
    }
    this.wrapper.innerHTML = html;
  }
}

export default Watermark;
