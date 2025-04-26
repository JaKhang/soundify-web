import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      react(),
    tailwindcss()],
  resolve: {
    alias: {
      "@services": path.resolve(__dirname, "./src/services"),
      "@constants": path.resolve(__dirname, "./src/constants"),
      "@models": path.resolve(__dirname, "./src/models"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@themes": path.resolve(__dirname, "./src/themes"),
      "@layout": path.resolve(__dirname, "./src/layout"),
      "@redux": path.resolve(__dirname, "./src/redux"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@": path.resolve(__dirname, "./src"),
    },
  }
})
