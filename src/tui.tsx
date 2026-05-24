/** @jsxImportSource @opentui/solid */
import { validateConfig } from "./config"
import { createLogoComponent } from "./logo"
import { createPromptComponent } from "./prompt"

const tui = async (api: any, options?: unknown) => {
  try {
    const config = validateConfig(options)

    // Report warnings
    for (const warning of config.warnings) {
      console.error(`[opencode-tui] ${warning}`)
      try { api.ui.toast({ title: "opencode-tui", description: warning }) } catch {}
    }

    // Logo slot
    if (config.logo !== false) {
      const LogoComponent = createLogoComponent(config.logo || undefined)
      api.slots.register({
        slots: {
          home_logo(_ctx: any, _value: any) {
            return <LogoComponent />
          },
        },
      })
    }

    // Prompt slot
    if (config.prompt !== false) {
      const promptRenderer = createPromptComponent(config.prompt || undefined, api)
      api.slots.register({
        slots: {
          home_prompt(_ctx: any, value: any) {
            return promptRenderer(value)
          },
        },
      })
    }
  } catch (err) {
    console.error("[opencode-tui] Unexpected error:", err)
    try { api.ui.toast({ title: "opencode-tui", description: "Plugin failed to initialize" }) } catch {}
  }
}

export default {
  id: "opencode-tui",
  tui,
}
