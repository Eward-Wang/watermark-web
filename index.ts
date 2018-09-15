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
  private styleSheetIndex: number = 0;
  private styleSheet: CSSStyleSheet = null;
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
    if (document.styleSheets.length === 0) {
      const style = document.createElement("style");
      document.head.appendChild(style);
    }
    this.styleSheetIndex = document.styleSheets.length - 1;
    this.styleSheet = document.styleSheets[
      this.styleSheetIndex
    ] as CSSStyleSheet;
  }
  public init() {
    this.gWrapperDOM().gWatermarkDOM();
  }
  public destory(): void {
    const el = document.getElementById(this.setting.id);
    if (!el) return;
    el.innerHTML = "";
  }
  /**
   * 生成包裹层
   * @author Eward
   * 18/08/31
   */
  private gWrapperDOM(): this {
    const { id } = this.setting;
    let wrapper = document.getElementById(id);
    const cssRule = `#${id} {
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
    }`;

    if (!wrapper) {
      this.styleSheet.insertRule(cssRule, this.styleSheetIndex);
      wrapper = document.createElement("div");
      wrapper.setAttribute("id", id);
      document.body.appendChild(wrapper);
    }
    return this;
  }
  /**
   * 循环生成每个水印dom
   * @author Eward
   * 18/08/31
   */
  private gWatermarkDOM() {
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
      Math.ceil(max_height / (height + 2 * this.setting.gutterY)) *
      Math.ceil(max_width / (this.setting.width + 2 * this.setting.gutterX));

    const dom = document.createDocumentFragment();

    const cssRule = `#${this.setting.id} > div {
      transform: rotate(-${this.setting.angle}deg);
      width: ${this.setting.width}px;
      margin: ${this.setting.gutterY}px ${this.setting.gutterX}px;
      opacity: ${this.setting.alpha}
    }`;
    this.styleSheet.insertRule(cssRule, this.styleSheetIndex);

    for (let i = 1; i <= total; i++) {
      const span = document.createElement("div");
      const text = document.createTextNode(this.setting.text);
      span.appendChild(text);
      dom.appendChild(span);
    }
    document.getElementById(this.setting.id).appendChild(dom);
  }
}

export default Watermark;
