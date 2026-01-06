import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  return {
    server: {
      port: 3000,
      host: "0.0.0.0",
    },
    plugins: [react()],
    define: {
      "process.env.API_KEY": JSON.stringify(env.GEMINI_API_KEY),
      "process.env.GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
    build: {
      // Production optimizations
      target: "es2015",
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true, // Remove console.log in production
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          // Manual chunk splitting for better caching
          manualChunks: {
            "react-vendor": ["react", "react-dom"],
            "animation-vendor": ["gsap"],
            "icons-vendor": ["lucide-react"],
          },
        },
      },
      // Asset handling
      assetsInlineLimit: 4096, // 4kb - inline smaller assets as base64
      chunkSizeWarningLimit: 1000, // Warn for chunks > 1000kb
      // Ensure assets are copied correctly
      copyPublicDir: true,
    },
    // Optimize dependencies
    optimizeDeps: {
      include: ["react", "react-dom", "gsap", "lucide-react"],
    },
  };
});
