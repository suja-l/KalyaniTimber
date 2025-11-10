// suja-l/kalyanitimber/.../vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // --- ADD PROXY CONFIGURATION ---
  server: {
    proxy: {
      // Proxy requests starting with /products to the backend port 5000
      "/products": {
        target: "http://localhost:5000", // Your Express server port
        changeOrigin: true,
        // No rewrite needed, as the backend uses /products directly
      },
    },
  },
  // --- END PROXY CONFIGURATION ---
});
