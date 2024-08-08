import { defineConfig } from "vite"
import { vitePlugin as remix } from "@remix-run/dev"
import { capsizeRadixPlugin } from "vite-plugin-capsize-radix"
import arial from "@capsizecss/metrics/arial"

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
    capsizeRadixPlugin({
      outputPath: `.cache/typography.css`,
      defaultFontStack: [arial],
    }),
  ],
})
