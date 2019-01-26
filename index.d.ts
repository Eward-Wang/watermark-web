/**
 * 生成网站水印
 * @author Eward
 * 18/08/31
 */
export declare type watermarkSettingType = {
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
declare class Watermark {
    private setting;
    private wrapper;
    private update;
    constructor(setting: watermarkSettingType);
    init: () => void;
    destory(): void;
    change: (param: Partial<watermarkSettingType>) => void;
    /**
     * 生成包裹层
     * @author Eward
     * 18/08/31
     */
    private gWrapperDOM;
    /**
     * 计算生成个数
     * @author Eward <ewardwang@126.com>
     * 18/09/16
     */
    private calcTotal;
    /**
     * 循环生成每个水印dom
     * @author Eward
     * 18/08/31
     */
    private gWatermarkDOM;
    /**
     * debounce
     * @author Eward <ewardwang@126.com>
     * 18/09/16
     */
    private debounce;
}
export default Watermark;
