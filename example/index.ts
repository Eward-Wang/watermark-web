import Watermark from "../src";

const wm = new Watermark({
  // setting 见下方详细说明
  text: "ewardwang",
  alpha: 0.5,
});

wm.init();

setTimeout(
  () =>
    wm.change({
      text: "china",
      angle: 30,
    }),
  1000
);

setTimeout(() => wm.destory(), 3000);
