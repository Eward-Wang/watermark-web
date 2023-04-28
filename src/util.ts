export const isObject = (obj: any) =>
  obj && Object.prototype.toString.call(obj) === "[object Object]";

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
