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
        this.styleSheetIndex = 0;
        this.styleSheet = null;
        this.setting = __assign({ id: "watermark-web", text: "", gutterX: 15, gutterY: 15, size: 15, alpha: 0.35, width: 200, angle: 15 }, setting);
        if (document.styleSheets.length === 0) {
            var style = document.createElement("style");
            document.head.appendChild(style);
        }
        this.styleSheetIndex = document.styleSheets.length - 1;
        this.styleSheet = document.styleSheets[this.styleSheetIndex];
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
        var cssRule = "#" + id + " {\n      pointer-events: none;\n      position: fixed;\n      top: 0;\n      z-index: 9999;\n      width: 100vw;\n      height: 100vh;\n      display: flex;\n      justify-content: space-around;\n      align-content: space-around;\n      flex-wrap: wrap;\n    }";
        if (!wrapper) {
            this.styleSheet.insertRule(cssRule, this.styleSheetIndex);
            wrapper = document.createElement("div");
            wrapper.setAttribute("id", id);
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
        var cssRule = "#" + this.setting.id + " > div {\n      transform: rotate(-" + this.setting.angle + "deg);\n      width: " + this.setting.width + "px;\n      margin: " + this.setting.gutterY + "px " + this.setting.gutterX + "px;\n      opacity: " + this.setting.alpha + "\n    }";
        this.styleSheet.insertRule(cssRule, this.styleSheetIndex);
        for (var i = 1; i <= total; i++) {
            var span = document.createElement("div");
            var text = document.createTextNode(this.setting.text);
            span.appendChild(text);
            dom.appendChild(span);
        }
        document.getElementById(this.setting.id).appendChild(dom);
    };
    return Watermark;
}());
exports.default = Watermark;
