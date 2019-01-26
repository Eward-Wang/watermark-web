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
var Watermark = /** @class */ (function () {
    function Watermark(setting) {
        var _this = this;
        this.setting = null;
        this.wrapper = null;
        this.update = this.debounce(this.gWatermarkDOM, 100).bind(this);
        this.init = function () { return (_this.gWrapperDOM().gWatermarkDOM(),
            window.addEventListener("resize", _this.update)); };
        this.change = function (param) { return ((_this.setting = __assign({}, _this.setting, param)), _this.update()); };
        this.setting = __assign({ id: "watermark-web", text: "", gutterX: 15, gutterY: 15, size: 15, alpha: 0.35, width: 200, angle: 15 }, setting);
    }
    Watermark.prototype.destory = function () {
        window.removeEventListener("resize", this.update);
        var el = document.getElementById(this.setting.id);
        if (!el)
            return;
        el.innerHTML = "";
    };
    /**
     * 生成包裹层
     * @author Eward
     * 18/08/31
     */
    Watermark.prototype.gWrapperDOM = function () {
        var id = this.setting.id;
        this.wrapper = document.getElementById(id);
        if (!this.wrapper) {
            this.wrapper = document.createElement("div");
            this.wrapper.setAttribute("id", id);
            this.wrapper.style.cssText = "\n        pointer-events: none;\n        position: fixed;\n        top: 0;\n        z-index: 9999;\n        width: 100vw;\n        height: 100vh;\n        display: flex;\n        justify-content: space-around;\n        align-content: space-around;\n        flex-wrap: wrap;\n    ";
            document.body.appendChild(this.wrapper);
        }
        return this;
    };
    /**
     * 计算生成个数
     * @author Eward <ewardwang@126.com>
     * 18/09/16
     */
    Watermark.prototype.calcTotal = function () {
        // --------- 取出屏幕宽高 --------- created at 18.08.31 -- by Eward
        var max_width = Math.max(document.body.scrollWidth, document.body.clientWidth);
        var max_height = Math.max(document.body.scrollHeight, document.body.clientHeight);
        // --------- 计算出经过旋转后的水印实际高度 --------- created at 18.08.31 -- by Eward
        var height = Math.cos(this.setting.angle) * this.setting.size +
            Math.sin(this.setting.angle) * this.setting.width;
        // --------- 计算能生成多少个水印 --------- created at 18.08.31 -- by Eward
        var total = Math.ceil(max_height / (height + (this.setting.gutterY << 1))) *
            Math.ceil(max_width / (this.setting.width + (this.setting.gutterX << 1)));
        return total;
    };
    /**
     * 循环生成每个水印dom
     * @author Eward
     * 18/08/31
     */
    Watermark.prototype.gWatermarkDOM = function () {
        var total = this.calcTotal();
        var html = "";
        for (var i = 1; i <= total; i++) {
            html += "\n       <div style=\"transform: rotate(-" + this.setting.angle + "deg);width: " + this.setting.width + "px;margin: " + this.setting.gutterY + "px " + this.setting.gutterX + "px;opacity: " + this.setting.alpha + "\">\n        " + this.setting.text + "\n       </div>\n      ";
        }
        this.wrapper.innerHTML = html;
    };
    /**
     * debounce
     * @author Eward <ewardwang@126.com>
     * 18/09/16
     */
    Watermark.prototype.debounce = function (fn, time) {
        var last;
        return function () {
            var ctx = this, args = arguments;
            clearTimeout(last);
            last = setTimeout(function () {
                fn.apply(ctx, args);
            }, time);
        };
    };
    return Watermark;
}());
exports.default = Watermark;
