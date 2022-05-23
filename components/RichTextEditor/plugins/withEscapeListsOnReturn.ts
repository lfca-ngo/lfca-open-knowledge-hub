import { Editor, Element } from 'slate'

import { LIST_TYPES } from '../config'
import { isTextEmptyAtSelection, toggleBlock } from '../utils'

export function withEscapeListsOnReturn(editor: Editor) {
  const { insertBreak } = editor

  editor.insertBreak = () => {
    const [listNodeEntry] = Array.from(
      Editor.nodes<Element>(editor, {
        match: (n) =>
          !Editor.isEditor(n) &&
          Element.isElement(n) &&
          LIST_TYPES.includes(n.type),
      })
    )

    if (listNodeEntry) {
      listNodeEntry
      // Toggle back to paragraph if return is pressed on an empty list item
      if (isTextEmptyAtSelection(editor)) {
        const [node] = listNodeEntry
        return toggleBlock(editor, node.type)
      }
    }

    insertBreak()
  }

  return editor
}
