import { describe, expect, it } from "vitest"
import { validateConfig } from "./config"

describe("validateConfig", () => {
  it("uses defaults for undefined options", () => {
    expect(validateConfig(undefined)).toEqual({ logo: undefined, prompt: undefined, warnings: [] })
  })

  it("uses defaults for empty object options", () => {
    expect(validateConfig({})).toEqual({ logo: undefined, prompt: undefined, warnings: [] })
  })

  it("allows disabling logo only", () => {
    expect(validateConfig({ logo: false })).toEqual({ logo: false, prompt: undefined, warnings: [] })
  })

  it("allows disabling prompt only", () => {
    expect(validateConfig({ prompt: false })).toEqual({ logo: undefined, prompt: false, warnings: [] })
  })

  it("accepts valid inline logo segment hex colors", () => {
    expect(validateConfig({ logo: { rows: [{ segments: [{ text: "A", color: "#ABC" }] }] } })).toEqual({
      logo: { rows: [{ segments: [{ text: "A", color: "#ABC" }] }] },
      prompt: undefined,
      warnings: [],
    })

    expect(validateConfig({ logo: { rows: [{ segments: [{ text: "B", color: "#AABBCC" }] }] } })).toEqual({
      logo: { rows: [{ segments: [{ text: "B", color: "#AABBCC" }] }] },
      prompt: undefined,
      warnings: [],
    })
  })

  it.each(["red", "#GG0000", "123456", "#12345"])(
    "falls back to defaults and warns for invalid inline logo segment color %s",
    (color) => {
      const result = validateConfig({ logo: { rows: [{ segments: [{ text: "A", color }] }] } })

      expect(result.logo).toBeUndefined()
      expect(result.prompt).toBeUndefined()
      expect(result.warnings).toHaveLength(1)
      expect(result.warnings[0]).toContain("Invalid logo rows")
    },
  )

  it("rejects removed logo colors array", () => {
    const result = validateConfig({ logo: { colors: ["#FFF", "#000"] } })

    expect(result.logo).toBeUndefined()
    expect(result.prompt).toBeUndefined()
    expect(result.warnings).toHaveLength(1)
    expect(result.warnings[0]).toContain("Invalid logo config")
  })

  it("treats empty logo rows as defaults", () => {
    expect(validateConfig({ logo: { rows: [] } })).toEqual({ logo: undefined, prompt: undefined, warnings: [] })
  })

  it("treats empty normal placeholders as defaults", () => {
    expect(validateConfig({ prompt: { placeholders: { normal: [] } } })).toEqual({
      logo: undefined,
      prompt: undefined,
      warnings: [],
    })
  })

  it("isolates invalid logo from valid prompt", () => {
    const result = validateConfig({
      logo: { rows: [{ segments: [{ text: "ok", color: "red" }] }] },
      prompt: { placeholders: { normal: ["Build"], shell: ["List"] } },
    })

    expect(result.logo).toBeUndefined()
    expect(result.prompt).toEqual({ placeholders: { normal: ["Build"], shell: ["List"] } })
    expect(result.warnings).toHaveLength(1)
  })

  it("isolates invalid prompt from valid logo", () => {
    const result = validateConfig({
      logo: { rows: [{ segments: [{ text: "ok", color: "#fff" }] }] },
      prompt: { placeholders: { normal: [123] } },
    })

    expect(result.logo).toEqual({ rows: [{ segments: [{ text: "ok", color: "#fff" }] }] })
    expect(result.prompt).toBeUndefined()
    expect(result.warnings).toHaveLength(1)
  })

  it("never throws for hostile top-level inputs", () => {
    const hostileInputs = [123, null, [], "garbage", true, Symbol("bad")]

    for (const input of hostileInputs) {
      expect(() => validateConfig(input)).not.toThrow()
      const result = validateConfig(input)
      expect(result.logo).toBeUndefined()
      expect(result.prompt).toBeUndefined()
      expect(result.warnings.length).toBeGreaterThan(0)
    }
  })

  it("never throws for hostile nested inputs", () => {
    const hostileInputs = [
      { logo: null, prompt: null },
      { logo: [], prompt: [] },
      { logo: { colors: ["#fff", "#000"] }, prompt: { placeholders: [] } },
      { logo: { rows: [{ segments: [{ text: 1, color: "#fff" }] }] } },
      { logo: { rows: [{ segments: [{ text: "ok", color: 2 }] }] } },
      { prompt: { placeholders: { normal: "bad", shell: ["ok"] } } },
      { prompt: { placeholders: { normal: ["ok"], shell: [null] } } },
    ]

    for (const input of hostileInputs) {
      expect(() => validateConfig(input)).not.toThrow()
      expect(validateConfig(input).warnings.length).toBeGreaterThan(0)
    }
  })
})
