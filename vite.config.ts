import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // Required for polyfills to find node modules
    mainFields: ['module', 'jsnext:main', 'jsnext'],
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis", // fix 'global is not defined'
      },
      // Enable esbuild polyfills
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
    // Include the modules you are polyfilling to ensure they are pre-bundled
    include: ['buffer', 'process'],
  },
  // Ensure 'buffer' and 'process' are resolved to the correct polyfills during build
  build: {
    rollupOptions: {
      external: [], // Only needed if you have external dependencies
    },
  },
});