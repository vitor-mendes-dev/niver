import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Em dev usa "/", em produção usa "/niver/"
  base: mode === "production" ? "/niver/" : "/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  server: {
    port: 8080,
    host: true,
  },
}));