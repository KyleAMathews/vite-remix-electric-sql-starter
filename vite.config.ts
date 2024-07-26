import { defineConfig } from "vite"
import { vitePlugin as remix } from "@remix-run/dev"
import tsconfigPaths from "vite-tsconfig-paths"
import { capsizeRadixPlugin } from "vite-plugin-capsize-radix"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    remix({
      ssr: false,
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    // tsconfigPaths(),
    capsizeRadixPlugin({ outputPath: `.cache/typography.css` }),
  ],
})
