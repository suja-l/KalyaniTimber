// suja-l/kalyanitimber/.../vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // --- PROXY CONFIGURATION ---
  server: {
    proxy: {
      // Proxy requests starting with /products
      "/products": {
        target: "http://localhost:5000", // Your Express server port
        changeOrigin: true,
      },
      // ADDED: Proxy requests starting with /orders
      "/orders": {
        target: "http://localhost:5000", // Your Express server port
        changeOrigin: true,
      },
    },
  },
  // --- END PROXY CONFIGURATION ---
});