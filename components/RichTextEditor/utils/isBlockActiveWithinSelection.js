import { Editor, Element } from "slate"

export function isBlockActiveWithinSelection(editor, format) {
  const { selection } = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === format,
    })
  )

  return !!match
}
