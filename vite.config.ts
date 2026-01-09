import { defineConfig, loadEnv } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import { URL, fileURLToPath } from "node:url";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }): any => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: genPlugins(env),
    resolve: {
      alias: genAlias(),
    },
    build: genBuild(env),
  };
});

function genPlugins(env: any) {
  const enableVisualizer = env["VITE_ANALYZE"] === "true"; // 根据传入的环境变量判断是否要生成分析文件
  let plugin = [
    dts({
      entryRoot: resolve(__dirname, "./src"),
      tsconfigPath: resolve(__dirname, "./tsconfig.json"),
      outDir: "./dist/types",
    }),
  ];
  if (enableVisualizer) {
    plugin.push(
      visualizer({
        open: true,
        gzipSize: true, // 生成gzip分析
        brotliSize: true, // 生成broli分析
        filename: "analyzer.html", // 导出文件名
      })
    );
  }
  return plugin;
}

function genAlias() {
  const obj = {
    "@": "./src",
    // demo: "./demo",
    "dist": "./dist",
  };
  return Object.entries(obj).map(([key, path]) => {
    return {
      find: key,
      replacement: fileURLToPath(new URL(path, import.meta.url)),
    };
  });
}

// 生成build属性的配置
function genBuild(env: any) {
  const isProduction = env["VITE_KEY"] === "production";
  const build = {
    minify: "terser",
    terserOptions: {
      compress: {
        //生产环境时移除console
        drop_console: isProduction,
        drop_debugger: isProduction,
      },
    },
    sourcemap: false, // 生产环境关闭 sourcemap 提升构建速度
    chunkSizeWarningLimit: 1000, // chunk大小警告阈值
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
  };
  Object.assign(build, {
    outDir: "dist",
    lib: {
      entry: "./src/index.ts",
      formats: ["es",],
      fileName: "index",
    },
    rollupOptions: {
      external: [],
      output: {
        manualChunks(id) {
          // 将 src/classes 下的模块拆分到 classes chunk
          if (id.includes("src/classes")) {
            return "classes";
          }
          // 将 src/utils 下的模块拆分到 utils chunk
          if (id.includes("src/utils")) {
            return "utils";
          }
        },
      },
    },
    treeshake: {
      moduleSideEffects: false,
    },
  });
  return build;
}
