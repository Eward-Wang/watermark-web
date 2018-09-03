"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Watermark {
    constructor(setting) {
        this.setting = null;
        this.setting = Object.assign({ id: "watermark-web", text: "", gutterX: 15, gutterY: 15, size: 15, alpha: 0.35, width: 200, angle: 15 }, setting);
    }
    init() {
        this.gWrapperDOM().gWatermarkDOM();
    }
    destory() {
        const el = document.getElementById(this.setting.id);
        if (!el)
            return;
        el.innerHTML = "";
    }
    gWrapperDOM() {
        const { id } = this.setting;
        let wrapper = document.getElementById(id);
        if (!wrapper) {
            wrapper = document.createElement("div");
            wrapper.setAttribute("id", id);
            wrapper.style.pointerEvents = "none";
            wrapper.style.position = "fixed";
            wrapper.style.top = "0";
            wrapper.style.zIndex = "2000";
            wrapper.style.width = "100vw";
            wrapper.style.height = "100vh";
            wrapper.style.display = "flex";
            wrapper.style.justifyContent = "space-around";
            wrapper.style.alignContent = "space-around";
            wrapper.style.flexWrap = "wrap";
            document.body.appendChild(wrapper);
        }
        return this;
    }
    gWatermarkDOM() {
        const max_width = Math.max(document.body.scrollWidth, document.body.clientWidth);
        const max_height = Math.max(document.body.scrollHeight, document.body.clientHeight);
        const height = Math.cos(this.setting.angle) * this.setting.size +
            Math.sin(this.setting.angle) * this.setting.width;
        const total = Math.ceil(max_height / (height + 2 * this.setting.gutterY)) *
            Math.ceil(max_width / (this.setting.width + 2 * this.setting.gutterX));
        const dom = document.createDocumentFragment();
        for (let i = 1; i <= total; i++) {
            const span = document.createElement("div");
            const text = document.createTextNode(this.setting.text);
            span.appendChild(text);
            span.style.transform = `rotate(-${this.setting.angle}deg)`;
            span.style.width = this.setting.width + "px";
            span.style.marginLeft = this.setting.gutterX + "px";
            span.style.marginRight = this.setting.gutterX + "px";
            span.style.marginTop = this.setting.gutterY + "px";
            span.style.marginBottom = this.setting.gutterY + "px";
            span.style.opacity = this.setting.alpha + "";
            dom.appendChild(span);
        }
        document.getElementById(this.setting.id).appendChild(dom);
    }
}
exports.default = Watermark;
