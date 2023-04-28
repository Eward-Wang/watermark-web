import { isObject, debounce } from "./util";

/**
 * 生成网站水印
 * @author Eward
 * 18/08/31
 */
export type watermarkSettingType = {
  /**
   * 水印显示的字
   * @author Eward
   * 18/08/31
   */
  text: string;
  /**
   * 横向之间间距
   * @author Eward
   * @default 32
   * 18/08/31
   */
  gutterX?: number;
  /**
   * 纵向之间间距
   * @author Eward
   * @default 16
   * 18/08/31
   */
  gutterY?: number;
  /**
   * 透明度(0-1)
   * @author Eward
   * 18/08/31
   */
  alpha?: number;
  /**
   * 水印倾斜度数 deg
   * @author Eward
   * @default 15
   * 18/08/31
   */
  angle?: number;
  /**
   * 更新频率 ms
   * @author Eward <ewardwang@126.com>
   * @default 50
   * @since 19/12/17
   */
  debounce?: number;
};

class Watermark {
  private setting: watermarkSettingType = null;
  private wrapper: HTMLElement = null;
  private readonly update: () => void = null;
  private uuid = `ww-${Math.random().toString(36).slice(2, 6)}`;

  constructor(setting?: watermarkSettingType) {
    this.setting = {
      text: "",
      alpha: 0.35,
      angle: 15,
      debounce: 50,
      gutterX: 32,
      gutterY: 16,
      ...((isObject(setting) && setting) || {}),
    };

    this.update = debounce(this.gWatermarkDOM, this.setting.debounce).bind(
      this
    );
  }

  public init = () => {
    this.gWrapperDOM();
    this.gWatermarkDOM();
    window.addEventListener("resize", this.update);
  };

  // aha destory -> destroy;
  public destory() {
    this.destroy();
  }

  public destroy() {
    window.removeEventListener("resize", this.update);
    const el = document.getElementById(this.uuid);
    this.wrapper = null;
    if (!el) return;
    el.innerHTML = "";
  }

  public change = (param?: Partial<watermarkSettingType>): void => {
    if (!isObject(param)) return;
    this.setting = { ...this.setting, ...param };
    this.update();
  };

  private gWrapperDOM() {
    this.wrapper = document.getElementById(this.uuid);

    if (!this.wrapper) {
      this.wrapper = document.createElement("div");
      this.wrapper.setAttribute("id", this.uuid);
      this.wrapper.style.cssText = `
        pointer-events: none;
        position: fixed;
        top: 0;
        z-index: 9999;
        width: 100%;
        height: 100%;
        overflow: hidden;
    `;
      document.body.appendChild(this.wrapper);
    }
  }

  private gElNode() {
    const el = document.createElement("span");
    el.style.cssText = `
      display: inline-block;
      padding: ${this.setting.gutterY}px ${this.setting.gutterX}px;
      opacity: ${this.setting.alpha};
      box-sizing: border-box;
    `;
    const span = document.createElement("span");
    span.style.cssText = `
      transform: rotate(-${this.setting.angle}deg);
      display: inline-block;
      padding: 16px 32px;
      line-height: 1.5em; 
      box-sizing: border-box;
    `;
    span.innerText = this.setting.text;
    el.appendChild(span);
    return el;
  }

  private gRowNode() {
    const el = document.createElement("div");
    el.style.cssText = `
      display: flex;
      justify-content: space-between;
    `;
    return el;
  }

  private gWatermarkDOM() {
    if (!this.wrapper) {
      this.init();
    }
    this.wrapper.innerHTML = "";
    const firstChild = this.gElNode();
    this.wrapper.appendChild(firstChild);
    const { width, height } = firstChild.getBoundingClientRect();
    const rowN = Math.ceil(
      Math.min(document.body.scrollHeight, document.body.clientHeight) /
        Math.ceil(height)
    );
    const colN = Math.ceil(
      Math.min(document.body.scrollWidth, document.body.clientWidth) /
        Math.ceil(width)
    );
    this.wrapper.removeChild(firstChild);

    const vel = document.createDocumentFragment();
    for (let row = 0; row < rowN; row++) {
      const r = this.gRowNode();
      for (let col = 0; col < colN; col++) {
        r.appendChild(this.gElNode());
      }
      vel.appendChild(r);
    }
    this.wrapper.appendChild(vel);
  }
}

export default Watermark;
