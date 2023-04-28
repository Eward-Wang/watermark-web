import Watermark from "../src";

const wm = new Watermark({
  // setting 见下方详细说明
  text: "ewardwang",
});

wm.init();

setTimeout(
  () =>
    wm.change({
      text: "china",
    }),
  1000
);

// setTimeout(() => wm.destory(), 3000);
