const Bundler = require("parcel-bundler");
const Path = require("path");

(async function packFile() {
  const bundler = new Bundler(Path.join(__dirname, "../index.ts"), {
    target: "node",
    outDir: "build"
  });
  await bundler.bundle();
  process.exit(0);
})();
