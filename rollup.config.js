const path = require("path");
const typescript = require("rollup-plugin-ts");
const sourceMaps = require("rollup-plugin-sourcemaps");
const resolve = require("rollup-plugin-node-resolve");
const terser = require("rollup-plugin-terser").terser;
const dts = require("rollup-plugin-dts").default;
const resolveFile = function (filePath) {
  return path.join(__dirname, "./", filePath);
};
export default [
  {
    input: resolveFile("index.ts"),
    output: [
      {
        file: resolveFile("dist/cjs/index.js"),
        format: "cjs",
        sourcemap: true,
      },
      {
        file: resolveFile("dist/esm/index.js"),
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      typescript({
        tsconfig: resolveFile("tsconfig.json"),
        hook: {
          // Always rename declaration files to index.d.ts to avoid emitting two declaration files with identical contents
          outputPath: (path, kind) =>
            kind === "declaration" ? resolveFile("./dist/index.d.ts") : path,
        },
      }),
      resolve(),
      sourceMaps(),
      terser({
        compress: {
          drop_debugger: true,
        },
      }),
    ],
  },
  {
    input: resolveFile("index.ts"),
    output: [
      {
        file: resolveFile("dist/@types/index.d.ts"),
        format: "esm",
      },
    ],
    plugins: [
      typescript({
        tsconfig: {
          fileName: resolveFile("tsconfig.json"),
          hook: (resolveConfig) => ({ ...resolveConfig, declaration: false }),
        },
      }),
      resolve(),
      dts(),
    ],
  },
];
