### watermark-web

![Version](https://img.shields.io/npm/v/watermark-web.svg)

#### Simple Usage

```js
import Watermark from "watermark-web";

const wm = new Watermark({
    // setting 见下方详细说明
    text: "ewardwang"
});

wm.init();

setTimeout(
    () =>
        wm.change({
            text: "china"
        }),
    1000
);

setTimeout(() => wm.destory(), 3000);
```

#### Setting

```typescript
/**
 * 生成网站水印
 * @author Eward
 * 18/08/31
 */
type watermarkSettingType = {
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
```

### public functions

```typescript
declare class Watermark {
    constructor(setting: watermarkSettingType);

    // generate watermark
    init: () => void;

    // destroy instance
    destroy(): void;

    // update watermark: exp: change watermark's text content
    change: (param: Partial<watermarkSettingType>) => void;
}
```
