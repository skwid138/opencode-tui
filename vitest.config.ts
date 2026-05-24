import { defineConfig } from "vitest/config"
import path from "path"
import solid from "vite-plugin-solid"

export default defineConfig({
  plugins: [solid({ solid: { moduleName: "@opentui/solid", generate: "universal" } })],
  test: {
    environment: "node",
    alias: {
      "@opentui/solid": path.resolve(__dirname, "src/__mocks__/opentui-solid.ts"),
    },
    coverage: {
      provider: "v8",
      include: ["src/config.ts"],
      thresholds: {
        "src/config.ts": { statements: 90, branches: 90, functions: 90, lines: 90 },
      },
    },
  },
})
