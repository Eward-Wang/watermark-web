export declare const isObject: (obj: any) => boolean;
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
export declare function calcTotalNum(areaWidth: number, areaHeight: number, width: number, height: number, angle: number, gutterX: number, gutterY: number): number;
export declare function debounce(fn: Function, time: number): () => void;
