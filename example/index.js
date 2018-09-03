import watermark from "../index.ts";

const wm = new watermark({
  text: "ewardwang"
});

wm.init();


setTimeout(() => {
  wm.destory()
}, 3000);