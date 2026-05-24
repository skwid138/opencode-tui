# @skwid138/opencode-tui

Lipstick for your OpenCode TUI.

`@skwid138/opencode-tui` is a configurable OpenCode TUI plugin that replaces the home screen logo and prompt placeholders with friendlier defaults. Use it as-is, customize the colors and ASCII rows, swap prompt suggestions, or disable either section independently.

## Install

```sh
npm install @skwid138/opencode-tui
```

Add the TUI entry to your OpenCode plugin configuration using the package's TUI export:

```jsonc
{
  "plugins": ["@skwid138/opencode-tui/tui"]
}
```

## Usage

### Zero config

Use the default JustVibes logo and default prompt placeholders:

```jsonc
{
  "plugins": ["@skwid138/opencode-tui/tui"]
}
```

### Custom logo colors

Colors must be 3- or 6-digit hex strings including `#`.

```jsonc
{
  "plugins": [
    [
      "@skwid138/opencode-tui/tui",
      {
        "logo": {
          "colors": ["#0ff", "#ff66aa"]
        }
      }
    ]
  ]
}
```

### Disable sections

Disable only the logo:

```jsonc
{
  "plugins": [
    ["@skwid138/opencode-tui/tui", { "logo": false }]
  ]
}
```

Disable only the prompt override:

```jsonc
{
  "plugins": [
    ["@skwid138/opencode-tui/tui", { "prompt": false }]
  ]
}
```

Disable both sections:

```jsonc
{
  "plugins": [
    ["@skwid138/opencode-tui/tui", { "logo": false, "prompt": false }]
  ]
}
```

### Custom prompts

```jsonc
{
  "plugins": [
    [
      "@skwid138/opencode-tui/tui",
      {
        "prompt": {
          "placeholders": {
            "normal": [
              "Build a dashboard for my team",
              "Refactor this component",
              "Help me debug this error"
            ],
            "shell": [
              "List files by size",
              "Show current git status"
            ]
          }
        }
      }
    ]
  ]
}
```

### Custom logo rows

Each row contains text segments. `color` must be `0` or `1`, indexing into the configured color tuple.

```jsonc
{
  "plugins": [
    [
      "@skwid138/opencode-tui/tui",
      {
        "logo": {
          "colors": ["#5DBDB3", "#F8B4C4"],
          "rows": [
            {
              "segments": [
                { "text": "Open", "color": 0 },
                { "text": "Code", "color": 1 }
              ]
            }
          ]
        }
      }
    ]
  ]
}
```

## Options reference

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `logo` | `false \| LogoConfig` | default logo | Set to `false` to leave `home_logo` untouched. |
| `logo.colors` | `[string, string]` | `["#5DBDB3", "#F8B4C4"]` | Teal/pink color tuple. Values must match `#RGB` or `#RRGGBB`. Empty arrays fall back to defaults. |
| `logo.rows` | `Array<{ segments: Array<{ text: string; color: 0 \| 1 }> }>` | JustVibes ASCII art | Logo rows rendered as horizontal text segments. Empty arrays fall back to defaults. |
| `prompt` | `false \| PromptConfig` | default prompt | Set to `false` to leave `home_prompt` untouched. |
| `prompt.placeholders.normal` | `string[]` | 11 default ideas | Suggestions for normal prompt mode. Empty arrays fall back to defaults. |
| `prompt.placeholders.shell` | `string[]` | 3 default shell ideas | Suggestions for shell prompt mode. Empty arrays fall back to defaults. |

Invalid sections are isolated: a bad `logo` config falls back to the default logo without breaking prompt customization, and a bad `prompt` config falls back without breaking the logo. Validation never throws; warnings are logged and surfaced through the OpenCode toast API when available.

## Development

Install dependencies:

```sh
npm install
```

Run tests:

```sh
npm test
```

Run tests with coverage:

```sh
npm run test:coverage
```

Type-check:

```sh
npm run typecheck
```

Build the package:

```sh
npm run build
```

The build emits ESM artifacts and declaration files into `dist/`.
