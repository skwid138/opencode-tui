import { describe, expect, it } from "vitest"
import { DEFAULT_COLORS, DEFAULT_LOGO_ROWS, DEFAULT_PLACEHOLDERS } from "./defaults"

const hexColorRe = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/

describe("defaults", () => {
  it("provides 10 default logo rows", () => {
    expect(DEFAULT_LOGO_ROWS).toHaveLength(10)
  })

  it("provides exactly 2 segments per logo row", () => {
    for (const row of DEFAULT_LOGO_ROWS) {
      expect(row.segments).toHaveLength(2)
    }
  })

  it("provides valid default hex colors", () => {
    expect(DEFAULT_COLORS.every((color) => hexColorRe.test(color))).toBe(true)
  })

  it("provides 11 normal prompt placeholders", () => {
    expect(DEFAULT_PLACEHOLDERS.normal).toHaveLength(11)
  })

  it("provides 3 shell prompt placeholders", () => {
    expect(DEFAULT_PLACEHOLDERS.shell).toHaveLength(3)
  })
})
