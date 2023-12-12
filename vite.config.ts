import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    define: {
      ELECTRIC_URL: JSON.stringify(process.env.ELECTRIC_URL),
    },
    assetsInclude: [`**/*.wasm`],
  }
})
