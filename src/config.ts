export interface OpencodeTuiOptions {
  logo?: false | LogoConfig
  prompt?: false | PromptConfig
}

export interface LogoConfig {
  rows?: Array<{ segments: Array<{ text: string; color: string }> }>
}

export interface PromptConfig {
  placeholders?: { normal?: string[]; shell?: string[] }
}

export interface ValidatedConfig {
  logo: LogoConfig | false | undefined
  prompt: PromptConfig | false | undefined
  warnings: string[]
}

const HEX_COLOR_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function validateRows(value: unknown): LogoConfig["rows"] | undefined | false {
  if (!Array.isArray(value)) return false
  if (value.length === 0) return undefined

  const rows: LogoConfig["rows"] = []

  for (const row of value) {
    if (!isRecord(row) || !Array.isArray(row.segments) || row.segments.length === 0) return false

    const segments: Array<{ text: string; color: string }> = []
    for (const segment of row.segments) {
      if (!isRecord(segment)) return false
      if (typeof segment.text !== "string") return false
      if (typeof segment.color !== "string" || !HEX_COLOR_RE.test(segment.color)) return false

      segments.push({ text: segment.text, color: segment.color })
    }

    rows.push({ segments })
  }

  return rows
}

function validateLogoSection(value: unknown, warnings: string[]): LogoConfig | false | undefined {
  if (value === undefined) return undefined
  if (value === false) return false

  if (!isRecord(value)) {
    warnings.push("Invalid logo config; using default logo")
    return undefined
  }

  const logo: LogoConfig = {}

  if ("colors" in value) {
    warnings.push("Invalid logo config; logo.colors is not supported")
    return undefined
  }

  if ("rows" in value) {
    const rows = validateRows(value.rows)
    if (rows === false) {
      warnings.push("Invalid logo rows; using default logo")
      return undefined
    }
    if (rows !== undefined) logo.rows = rows
  }

  return Object.keys(logo).length > 0 ? logo : undefined
}

function validateStringArray(value: unknown): string[] | undefined | false {
  if (!Array.isArray(value)) return false
  if (value.length === 0) return undefined
  if (!value.every((item) => typeof item === "string")) return false

  return [...value]
}

function validatePlaceholders(value: unknown): PromptConfig["placeholders"] | undefined | false {
  if (!isRecord(value)) return false

  const placeholders: NonNullable<PromptConfig["placeholders"]> = {}

  if ("normal" in value) {
    const normal = validateStringArray(value.normal)
    if (normal === false) return false
    if (normal !== undefined) placeholders.normal = normal
  }

  if ("shell" in value) {
    const shell = validateStringArray(value.shell)
    if (shell === false) return false
    if (shell !== undefined) placeholders.shell = shell
  }

  return Object.keys(placeholders).length > 0 ? placeholders : undefined
}

function validatePromptSection(value: unknown, warnings: string[]): PromptConfig | false | undefined {
  if (value === undefined) return undefined
  if (value === false) return false

  if (!isRecord(value)) {
    warnings.push("Invalid prompt config; using default prompt")
    return undefined
  }

  const prompt: PromptConfig = {}

  if ("placeholders" in value) {
    const placeholders = validatePlaceholders(value.placeholders)
    if (placeholders === false) {
      warnings.push("Invalid prompt placeholders; using default prompt")
      return undefined
    }
    if (placeholders !== undefined) prompt.placeholders = placeholders
  }

  return Object.keys(prompt).length > 0 ? prompt : undefined
}

export function validateConfig(options: unknown): ValidatedConfig {
  const warnings: string[] = []

  try {
    if (options === undefined) {
      return { logo: undefined, prompt: undefined, warnings }
    }

    if (!isRecord(options)) {
      warnings.push("Invalid plugin options; using defaults")
      return { logo: undefined, prompt: undefined, warnings }
    }

    return {
      logo: validateLogoSection(options.logo, warnings),
      prompt: validatePromptSection(options.prompt, warnings),
      warnings,
    }
  } catch {
    warnings.push("Invalid plugin options; using defaults")
    return { logo: undefined, prompt: undefined, warnings }
  }
}
