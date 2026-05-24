import { defineConfig } from "vite"
import solid from "vite-plugin-solid"
import dts from "vite-plugin-dts"

export default defineConfig({
  plugins: [
    solid({ solid: { moduleName: "@opentui/solid", generate: "universal" } }),
    dts({ include: ["src/**/*.ts", "src/**/*.tsx"], exclude: ["src/**/*.test.*", "src/__mocks__/**"] }),
  ],
  build: {
    lib: {
      entry: {
        tui: "src/tui.tsx",
        config: "src/config.ts",
      },
      formats: ["es"],
    },
    rollupOptions: {
      external: [/^@opencode-ai\//, /^@opentui\//, /^solid-js/],
    },
    target: "esnext",
  },
})
