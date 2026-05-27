# @skwid138/opencode-tui

Lipstick for your OpenCode TUI.

[![npm](https://img.shields.io/npm/v/@skwid138/opencode-tui)](https://npmjs.com/package/@skwid138/opencode-tui) [![CI](https://github.com/skwid138/opencode-tui/actions/workflows/ci.yml/badge.svg)](https://github.com/skwid138/opencode-tui/actions/workflows/ci.yml) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

`@skwid138/opencode-tui` is a configurable OpenCode TUI plugin that replaces the home screen logo and prompt placeholders with friendlier defaults. Use it as-is, customize ASCII logo rows with per-segment inline colors, swap prompt suggestions for normal and shell modes, or disable either section independently while invalid config safely falls back to defaults.

## Quick Start

Install the package:

```sh
npm install @skwid138/opencode-tui
```

Add the TUI entry to your OpenCode plugin configuration using the package's TUI export:

```jsonc
{
  "plugin": ["@skwid138/opencode-tui/tui"]
}
```

## Features

- Custom ASCII logos made from rows of inline text segments.
- Per-segment logo colors using 3- or 6-digit hex values.
- Prompt placeholder customization for normal and shell modes.
- Disable logo or prompt customization independently.
- Graceful fallback to defaults when config is invalid.
- Companion Logo Builder web app for generating `logo.rows` config.

## Usage

### Zero config

Use the default JustVibes logo and default prompt placeholders:

```jsonc
{
  "plugin": ["@skwid138/opencode-tui/tui"]
}
```

Plugin options are registered as a tuple: `["@skwid138/opencode-tui/tui", { config }]`.

### Disable sections

Disable only the logo:

```jsonc
{
  "plugin": [
    ["@skwid138/opencode-tui/tui", { "logo": false }]
  ]
}
```

Disable only the prompt override:

```jsonc
{
  "plugin": [
    ["@skwid138/opencode-tui/tui", { "prompt": false }]
  ]
}
```

Disable both sections:

```jsonc
{
  "plugin": [
    ["@skwid138/opencode-tui/tui", { "logo": false, "prompt": false }]
  ]
}
```

### Custom prompts

```jsonc
{
  "plugin": [
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

Each row contains literal pre-rendered ASCII text segments. Segment `color` is an inline 3- or 6-digit hex string including `#`.

```jsonc
{
  "plugin": [
    [
      "@skwid138/opencode-tui/tui",
      {
        "logo": {
          "rows": [
            {
              "segments": [
                { "text": "Open", "color": "#5DBDB3" },
                { "text": "Code", "color": "#F8B4C4" }
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
| `logo.rows` | `Array<{ segments: Array<{ text: string; color: string }> }>` | JustVibes ASCII art | Logo rows rendered as horizontal text segments. Segment colors must match `#RGB` or `#RRGGBB`. Empty arrays fall back to defaults. |
| `prompt` | `false \| PromptConfig` | default prompt | Set to `false` to leave `home_prompt` untouched. |
| `prompt.placeholders.normal` | `string[]` | 11 default ideas | Suggestions for normal prompt mode. Empty arrays fall back to defaults. |
| `prompt.placeholders.shell` | `string[]` | 3 default shell ideas | Suggestions for shell prompt mode. Empty arrays fall back to defaults. |

Invalid sections are isolated: a bad `logo` config falls back to the default logo without breaking prompt customization, and a bad `prompt` config falls back without breaking the logo. Validation never throws; warnings are logged and surfaced through the OpenCode toast API when available.

## Logo Builder

Use the companion Logo Builder app to generate custom `logo.rows` config: <https://skwid138.github.io/opencode-logo-builder/>. The companion repo lives at <https://github.com/skwid138/opencode-logo-builder>.

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

## License

MIT © [Spencer Miller](https://github.com/skwid138)
