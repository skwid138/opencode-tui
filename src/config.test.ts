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

  it("accepts valid logo colors", () => {
    expect(validateConfig({ logo: { colors: ["#FFF", "#000"] } })).toEqual({
      logo: { colors: ["#FFF", "#000"] },
      prompt: undefined,
      warnings: [],
    })
  })

  it("falls back to defaults and warns for invalid logo colors", () => {
    const result = validateConfig({ logo: { colors: ["invalid", "#000"] } })

    expect(result.logo).toBeUndefined()
    expect(result.prompt).toBeUndefined()
    expect(result.warnings).toHaveLength(1)
    expect(result.warnings[0]).toContain("Invalid logo colors")
  })

  it("treats empty logo colors as defaults", () => {
    expect(validateConfig({ logo: { colors: [] } })).toEqual({ logo: undefined, prompt: undefined, warnings: [] })
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
      logo: { colors: ["nope", "#000"] },
      prompt: { placeholders: { normal: ["Build"], shell: ["List"] } },
    })

    expect(result.logo).toBeUndefined()
    expect(result.prompt).toEqual({ placeholders: { normal: ["Build"], shell: ["List"] } })
    expect(result.warnings).toHaveLength(1)
  })

  it("isolates invalid prompt from valid logo", () => {
    const result = validateConfig({
      logo: { colors: ["#fff", "#000"] },
      prompt: { placeholders: { normal: [123] } },
    })

    expect(result.logo).toEqual({ colors: ["#fff", "#000"] })
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
      { logo: { colors: ["#fff"] }, prompt: { placeholders: [] } },
      { logo: { rows: [{ segments: [{ text: 1, color: 0 }] }] } },
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
