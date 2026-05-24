import { beforeEach, describe, expect, it, vi } from "vitest"
import plugin from "./tui"

function createApi() {
  return {
    slots: {
      register: vi.fn(),
    },
    ui: {
      Prompt: vi.fn((props: unknown) => props),
      Slot: vi.fn((props: unknown) => props),
      toast: vi.fn(),
    },
  }
}

function registeredSlotNames(api: ReturnType<typeof createApi>) {
  return api.slots.register.mock.calls.flatMap(([registration]) => Object.keys(registration.slots))
}

describe("opencode-tui plugin", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {})
  })

  it("exports the plugin id", () => {
    expect(plugin.id).toBe("opencode-tui")
  })

  it("registers both slots by default", async () => {
    const api = createApi()

    await plugin.tui(api)

    expect(registeredSlotNames(api)).toEqual(["home_logo", "home_prompt"])
  })

  it("registers only the prompt when logo is disabled", async () => {
    const api = createApi()

    await plugin.tui(api, { logo: false })

    expect(registeredSlotNames(api)).toEqual(["home_prompt"])
  })

  it("registers only the logo when prompt is disabled", async () => {
    const api = createApi()

    await plugin.tui(api, { prompt: false })

    expect(registeredSlotNames(api)).toEqual(["home_logo"])
  })

  it("registers nothing when both sections are disabled", async () => {
    const api = createApi()

    await plugin.tui(api, { logo: false, prompt: false })

    expect(api.slots.register).not.toHaveBeenCalled()
  })

  it("falls back to defaults for garbage options without throwing", async () => {
    const api = createApi()

    await expect(plugin.tui(api, "garbage")).resolves.toBeUndefined()

    expect(registeredSlotNames(api)).toEqual(["home_logo", "home_prompt"])
    expect(api.ui.toast).toHaveBeenCalledWith({ title: "opencode-tui", description: expect.stringContaining("Invalid") })
  })

  it("does not throw when api is null", async () => {
    await expect(plugin.tui(null)).resolves.toBeUndefined()
  })
})
