export const isObject = (obj: any) =>
  obj && Object.prototype.toString.call(obj) === "[object Object]";

/**
 * 根据gutter、区域宽高、倾斜角度等计算可放总数
 * @param {Number} areaWidth - 区域宽度
 * @param {Number} areaHeight - 区域高度
 * @param {Number} height - 水印高度
 * @param {Number} width - 水印宽度
 * @param {Number} angle - 水印倾斜角度
 * @param {Number} gutterX - 水印横向间隔
 * @param {Number} gutterY - 水印纵向间隔
 * @author Eward <ewardwang@126.com>
 * @since 19/12/17
 */
export function calcTotalNum(
  areaWidth: number,
  areaHeight: number,
  width: number,
  height: number,
  angle: number,
  gutterX: number,
  gutterY: number
) {
  const actualHeight = Math.cos(angle) * height + Math.sin(angle) * width;

  return (
    Math.ceil(areaHeight / (actualHeight + (gutterY << 1))) *
    Math.ceil(areaWidth / (width + (gutterX << 1)))
  );
}

export function debounce(fn: Function, time: number) {
  let last: number;
  return function() {
    let ctx = this,
      args = arguments;
    clearTimeout(last);
    last = setTimeout(function() {
      fn.apply(ctx, args);
    }, time);
  };
}
