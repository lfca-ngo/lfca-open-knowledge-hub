import { Editor, Text } from "slate"

export function isMarkActiveWithinSelection(editor, mark) {
  // NOTE: Since `LSEditor.marks` only returns the marks for the first text leaf within the selection,
  // we created our own helper to check ALL text leaves.
  const [match] = Array.from(
    Editor.nodes(editor, {
      match: (n) => Text.isText(n) && !!n[mark],
      mode: "lowest",
    })
  )
  return !!match
}
