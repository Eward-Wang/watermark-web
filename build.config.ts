import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["./src/index"],
  outDir: "dist",
  declaration: true,
  rollup: {
    emitCJS: true,
    esbuild: {
      target: "es6",
      minify: true,
    },
  },
  failOnWarn: false,
  hooks: {
    "rollup:build"(ctx, r) {
      let x = r.write;
      r.write = async function (outputOptions) {
        function replaceCjs(str: string) {
          if (str.endsWith(".cjs")) {
            return str.replace(/^(.*)\.cjs$/, "$1.js");
          }
          return str;
        }

        if (typeof outputOptions.entryFileNames === "function") {
          const ofn = outputOptions.entryFileNames;
          outputOptions.entryFileNames = function (chunkInfo) {
            const res = ofn(chunkInfo);
            return replaceCjs(res);
          };
        } else if (typeof outputOptions.entryFileNames === "string") {
          outputOptions.entryFileNames = replaceCjs(
            outputOptions.entryFileNames
          );
        }
        return x.call(null, outputOptions);
      };
    },
  },
});
