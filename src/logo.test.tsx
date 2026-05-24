/** @jsxImportSource @opentui/solid */
import { describe, expect, it } from "vitest"
import { createLogoComponent } from "./logo"

describe("createLogoComponent", () => {
  it("passes inline segment hex colors directly to text fg", () => {
    const Logo = createLogoComponent({
      rows: [{ segments: [{ text: "Open", color: "#123ABC" }] }],
    })

    const tree = Logo() as any

    expect(tree.children[0].children[0].props.fg).toBe("#123ABC")
    expect(tree.children[0].children[0].children[0]).toBe("Open")
  })
})
