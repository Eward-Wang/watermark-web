### watermark-web

![Version](https://img.shields.io/npm/v/watermark-web.svg)

### 功能

1. 能防止水印被删除和篡改，被修改后会自动触发重建
2. 能防止本地api被篡改，比如通过修改appendChild api来使水印重建失效的想法将不会得到实现;
3. 使用canvas绘制

#### 使用

```js
import Watermark from "watermark-web";

const wm = new Watermark({
    text: "hello world"
});

// start
wm.init();

// update setting
setTimeout(
    () =>
        wm.change({
            text: "hello github"
        }),
    1000
);

// destroy
setTimeout(() => wm.destroy(), 3000);
```

#### 配置

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

### 暴露的方法

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
