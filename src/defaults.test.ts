import { describe, expect, it } from "vitest"
import { DEFAULT_LOGO_ROWS, DEFAULT_PLACEHOLDERS } from "./defaults"

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

  it("provides inline valid default hex colors on every logo segment", () => {
    expect(DEFAULT_LOGO_ROWS.flatMap((row) => row.segments.map((segment) => segment.color))).toEqual(
      Array.from({ length: DEFAULT_LOGO_ROWS.length }).flatMap(() => ["#5DBDB3", "#F8B4C4"]),
    )
    expect(DEFAULT_LOGO_ROWS.every((row) => row.segments.every((segment) => hexColorRe.test(segment.color)))).toBe(true)
  })

  it("provides 11 normal prompt placeholders", () => {
    expect(DEFAULT_PLACEHOLDERS.normal).toHaveLength(11)
  })

  it("provides 3 shell prompt placeholders", () => {
    expect(DEFAULT_PLACEHOLDERS.shell).toHaveLength(3)
  })
})
