### watermark-web

![Version](https://img.shields.io/npm/v/watermark-web.svg)&nbsp;&nbsp;&nbsp;&nbsp;[![Build Status](https://travis-ci.com/Eward-Wang/watermark-web.svg?branch=master)](https://travis-ci.com/Eward-Wang/watermark-web)

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
declare type watermarkSettingType = {
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
```

### public functions

```typescript
declare class Watermark {
  constructor(setting: watermarkSettingType);
  init: () => void;
  destory(): void;
  change: (param: Partial<watermarkSettingType>) => void;
}
```
