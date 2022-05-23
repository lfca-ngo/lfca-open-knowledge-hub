import { Editor, Element, Node } from 'slate'

export function isTextEmptyAtSelection(editor: Editor) {
  // Get the lowest element (usually a textNode) to the current selection
  const [lowestNodeAtCursor] = Array.from(
    Editor.nodes(editor, {
      match: (n) => Element.isElement(n),
      mode: 'lowest',
    })
  )
  const [node] = lowestNodeAtCursor
  return !Node.string(node)
}
