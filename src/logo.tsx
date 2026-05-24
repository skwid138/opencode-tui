/** @jsxImportSource @opentui/solid */
import type { LogoConfig } from "./config"
import { DEFAULT_LOGO_ROWS } from "./defaults"

export function createLogoComponent(config: LogoConfig | undefined) {
  const rows = config?.rows ?? DEFAULT_LOGO_ROWS

  return function LogoComponent() {
    return (
      <box flexDirection="column">
        {rows.map((row) => (
          <box flexDirection="row">
            {row.segments.map((segment) => (
              <text fg={segment.color}>{segment.text}</text>
            ))}
          </box>
        ))}
      </box>
    )
  }
}
