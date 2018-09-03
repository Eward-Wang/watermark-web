### 水印用于现代浏览器

#### Usage

```js
const wm = new watermark({
  text: "ewardwang"
}); // setting

wm.init();

setTimeout(() => wm.destory(), 3000);
```

#### Setting

```typescript

export type watermarkSettingType = {
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


