import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@src": resolve(__dirname, "./src"),
      "@components": resolve(__dirname, "./src/Components"),
      "@pages": resolve(__dirname, "./src/Pages"),
      "@context": resolve(__dirname, "./src/Context"),
    },
  },
});
