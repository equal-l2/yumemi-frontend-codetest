import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  let config = {
    plugins: [vue()],
    server: {},
  };

  if (command === "serve") {
    // dev specific config
    config.server = {
      proxy: {
        "/api": {
          target: "http://localhost:8888/.netlify/functions/proxy",
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ""),
        },
      },
    };
  } else {
    // command === 'build'
    config.server = {
      proxy: {
        "/api": {
          target: "/.netlify/functions/proxy",
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ""),
        },
      },
    };
  }

  return config;
});
