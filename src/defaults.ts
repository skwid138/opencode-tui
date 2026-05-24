import type { LogoConfig, PromptConfig } from "./config"

export const DEFAULT_LOGO_ROWS = [
  { segments: [{ text: "                             ", color: "#5DBDB3" }, { text: "█    █                            ", color: "#F8B4C4" }] },
  { segments: [{ text: "  ███                  █     ", color: "#5DBDB3" }, { text: "█░  ░█        █                   ", color: "#F8B4C4" }] },
  { segments: [{ text: "    █                  █     ", color: "#5DBDB3" }, { text: "▓▒  ▒▓        █                   ", color: "#F8B4C4" }] },
  { segments: [{ text: "    █  █   █  ▒███▒  █████   ", color: "#5DBDB3" }, { text: "▒█  █▒ ███    █▓██    ███   ▒███▒ ", color: "#F8B4C4" }] },
  { segments: [{ text: "    █  █   █  █▒ ░█    █     ", color: "#5DBDB3" }, { text: " █  █    █    █▓ ▓█  ▓▓ ▒█  █▒ ░█ ", color: "#F8B4C4" }] },
  { segments: [{ text: "    █  █   █  █▒░      █     ", color: "#5DBDB3" }, { text: " █░░█    █    █   █  █   █  █▒░   ", color: "#F8B4C4" }] },
  { segments: [{ text: "    █  █   █  ░███▒    █     ", color: "#5DBDB3" }, { text: " ▓▒▒▓    █    █   █  █████  ░███▒ ", color: "#F8B4C4" }] },
  { segments: [{ text: "    █  █   █     ▒█    █     ", color: "#5DBDB3" }, { text: " ▒██▒    █    █   █  █         ▒█ ", color: "#F8B4C4" }] },
  { segments: [{ text: "█░ ▒█  █▒ ▓█  █░ ▒█    █░    ", color: "#5DBDB3" }, { text: "  ██     █    █▓ ▓█  ▓▓  █  █░ ▒█ ", color: "#F8B4C4" }] },
  { segments: [{ text: "▒███░  ▒██▒█  ▒███▒    ▒██   ", color: "#5DBDB3" }, { text: "  ██   █████  █▓██    ███▒  ▒███▒ ", color: "#F8B4C4" }] },
] as const satisfies NonNullable<LogoConfig["rows"]>

export const DEFAULT_PLACEHOLDERS = {
  normal: [
    "Build me a recipe app",
    "Help me organize something",
    "Will you help me with something?",
    "Make a website for my business",
    "I have an idea for an app",
    "My computer is doing something weird, can you fix it?",
    "Can you automate something for me?",
    "Is there a better way to do this?",
    "Can you make me an app I can use on my phone?",
    "Can you help me get data from a website?",
    "Can you help me build a goal tracking app?",
  ],
  shell: [
    "Show me my files",
    "What's using disk space?",
    "Check for software updates",
  ],
} as const satisfies Required<NonNullable<PromptConfig["placeholders"]>>
