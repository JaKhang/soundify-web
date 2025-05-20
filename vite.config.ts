import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      react()],
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
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),

      "@": path.resolve(__dirname, "./src"),
    },
  }
})
