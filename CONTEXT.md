# CONTEXT.md

Domain glossary for the `@skwid138/opencode-tui` plugin.

### Logo

The ASCII art displayed in the opencode TUI. Defined in config as a `logo` object containing `rows`. Default is "JustVibes" ASCII art in teal and pink.

### Row

A single horizontal line of the logo. Each row has an array of `segments` that render inline (horizontally concatenated).

### Segment (Block)

A piece of literal pre-rendered ASCII text within a row. Has `text` (the characters to render) and `color` (a hex string like `"#5DBDB3"`). Multiple segments in a row are concatenated horizontally.

### Color (segment property)

A hex color string (e.g., `"#FF0000"`) stored directly on each segment. There is no shared color palette or index indirection — color is a property OF each segment.

### JustVibes

The default logo. ASCII art rendered in two colors: teal (`#5DBDB3`) and pink (`#F8B4C4`).

### Logo Builder

A separate single-page web app (`skwid138/opencode-logo-builder`) that generates logo configs for this plugin. Deployed via GitHub Pages.
