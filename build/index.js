"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Watermark = (function () {
    function Watermark(setting) {
        this.setting = null;
        this.setting = __assign({ id: "watermark-web", text: "", gutterX: 15, gutterY: 15, size: 15, alpha: 0.35, width: 200, angle: 15 }, setting);
    }
    Watermark.prototype.init = function () {
        this.gWrapperDOM().gWatermarkDOM();
    };
    Watermark.prototype.destory = function () {
        var el = document.getElementById(this.setting.id);
        if (!el)
            return;
        el.innerHTML = "";
    };
    Watermark.prototype.gWrapperDOM = function () {
        var id = this.setting.id;
        var wrapper = document.getElementById(id);
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
    };
    Watermark.prototype.gWatermarkDOM = function () {
        var max_width = Math.max(document.body.scrollWidth, document.body.clientWidth);
        var max_height = Math.max(document.body.scrollHeight, document.body.clientHeight);
        var height = Math.cos(this.setting.angle) * this.setting.size +
            Math.sin(this.setting.angle) * this.setting.width;
        var total = Math.ceil(max_height / (height + 2 * this.setting.gutterY)) *
            Math.ceil(max_width / (this.setting.width + 2 * this.setting.gutterX));
        var dom = document.createDocumentFragment();
        for (var i = 1; i <= total; i++) {
            var span = document.createElement("div");
            var text = document.createTextNode(this.setting.text);
            span.appendChild(text);
            span.style.transform = "rotate(-" + this.setting.angle + "deg)";
            span.style.width = this.setting.width + "px";
            span.style.marginLeft = this.setting.gutterX + "px";
            span.style.marginRight = this.setting.gutterX + "px";
            span.style.marginTop = this.setting.gutterY + "px";
            span.style.marginBottom = this.setting.gutterY + "px";
            span.style.opacity = this.setting.alpha + "";
            dom.appendChild(span);
        }
        document.getElementById(this.setting.id).appendChild(dom);
    };
    return Watermark;
}());
exports.default = Watermark;
