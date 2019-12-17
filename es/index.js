import { isObject, calcTotalNum, debounce } from "./util";
class Watermark {
    constructor(setting) {
        this.setting = null;
        this.wrapper = null;
        this.update = debounce(this.gWatermarkDOM, this.setting.debounce).bind(this);
        this.init = () => (this.gWrapperDOM().gWatermarkDOM(),
            window.addEventListener("resize", this.update));
        this.change = (param) => {
            if (!isObject(param))
                return;
            this.setting = Object.assign(Object.assign({}, this.setting), param);
            this.update();
        };
        this.setting = Object.assign({ id: "watermark-web", text: "", gutterX: 15, gutterY: 15, size: 15, alpha: 0.35, width: 200, angle: 15, debounce: 100 }, ((isObject(setting) && setting) || {}));
    }
    destory() {
        window.removeEventListener("resize", this.update);
        const el = document.getElementById(this.setting.id);
        if (!el)
            return;
        el.innerHTML = "";
    }
    gWrapperDOM() {
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
    gWatermarkDOM() {
        if (!this.wrapper) {
            this.gWrapperDOM();
        }
        const total = calcTotalNum(Math.max(document.body.scrollWidth, document.body.clientWidth), Math.max(document.body.scrollHeight, document.body.clientHeight), this.setting.width, this.setting.size, this.setting.angle, this.setting.gutterX, this.setting.gutterY);
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
