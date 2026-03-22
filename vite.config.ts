import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  const isSSR = process.env.VITE_SSR === "1";

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: isSSR ? "dist/server" : "dist/client",
      rollupOptions: isSSR
        ? { input: "src/entry-server.tsx" }
        : { input: "index.html" },
    },
    ssr: {
    // Force Vite to bundle it into the SSR output (avoids Node ESM/CJS named-export crash)
    noExternal: ["react-helmet-async"],
  },
  };
});
