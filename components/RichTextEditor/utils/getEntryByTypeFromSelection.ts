import { Editor, Element } from 'slate'

export function getEntryByTypeFromSelection(editor: Editor, type: string) {
  const { selection } = editor
  if (!selection) return undefined

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === type,
    })
  )

  return match
}
