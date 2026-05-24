/** @jsxImportSource @opentui/solid */
import type { PromptConfig } from "./config"
import { DEFAULT_PLACEHOLDERS } from "./defaults"

export function createPromptComponent(config: PromptConfig | undefined, api: any) {
  const placeholders = config?.placeholders ?? DEFAULT_PLACEHOLDERS

  return (value: any) => {
    const Prompt = api.ui.Prompt
    const Slot = api.ui.Slot
    return (
      <Prompt
        ref={value.ref}
        workspaceID={value.workspace_id}
        right={<Slot name="home_prompt_right" workspace_id={value.workspace_id} />}
        placeholders={placeholders}
      />
    )
  }
}
