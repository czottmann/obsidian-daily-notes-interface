import esbuild from "esbuild";
import process from "process";
import builtins from "builtin-modules";

const isProduction = process.argv[2] === "production";

const config = {
  bundle: true,
  entryPoints: ["src/index.ts"],
  external: [
    "obsidian",
    "electron",
    "@codemirror/autocomplete",
    "@codemirror/collab",
    "@codemirror/commands",
    "@codemirror/language",
    "@codemirror/lint",
    "@codemirror/search",
    "@codemirror/state",
    "@codemirror/view",
    "@lezer/common",
    "@lezer/highlight",
    "@lezer/lr",
    ...builtins,
  ],
  format: "cjs",
  logLevel: "info",
  minify: isProduction,
  outfile: "dist/main.js",
  sourcemap: isProduction ? false : "inline",
  target: "es2022",
  treeShaking: true,
};

if (isProduction) {
  await esbuild.build(config);
} else {
  const ctx = await esbuild.context(config);
  ctx.watch();
  await ctx.rebuild().catch(() => process.exit(1));
}
