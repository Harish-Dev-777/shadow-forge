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
    css: {
      // Enable CSS code splitting for lazy-loaded components
      devSourcemap: true,
    },
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
      target: "es2020",
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          passes: 2,
        },
      },
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          // Manual chunk splitting for better caching & smaller initial load
          manualChunks: {
            "react-vendor": ["react", "react-dom"],
            "animation-vendor": ["gsap"],
            "motion-vendor": ["framer-motion"],
            "icons-vendor": ["lucide-react"],
            "convex-vendor": ["convex", "convex/react"],
          },
        },
      },
      // Asset handling
      assetsInlineLimit: 4096,
      chunkSizeWarningLimit: 500,
      copyPublicDir: true,
    },
    // Optimize dependencies
    optimizeDeps: {
      include: ["react", "react-dom", "gsap", "lucide-react", "framer-motion"],
    },
  };
});
