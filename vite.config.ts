import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { metaImagesPlugin } from "./vite-plugin-meta-images";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    metaImagesPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    // Inline tiny assets as base64 (saves HTTP requests for icons/logos < 8 KB)
    assetsInlineLimit: 8192,
    rollupOptions: {
      output: {
        // Split vendor chunks so browsers can cache them independently
        manualChunks(id) {
          if (id.includes("node_modules/framer-motion")) return "framer-motion";
          if (id.includes("node_modules/react-dom"))     return "react-dom";
          if (id.includes("node_modules/@radix-ui"))     return "radix-ui";
          if (id.includes("node_modules/recharts"))      return "recharts";
          if (id.includes("node_modules/lucide-react"))  return "lucide-react";
          if (id.includes("node_modules/"))              return "vendor";
        },
      },
    },
  },
});
