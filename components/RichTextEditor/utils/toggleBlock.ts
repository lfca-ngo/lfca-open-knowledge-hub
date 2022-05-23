import { Editor, Element, Transforms } from 'slate'

import { DEFAULT_ELEMENT_TYPE, LIST_TYPES } from '../config'
import { isBlockActiveWithinSelection } from './isBlockActiveWithinSelection'

export function toggleBlock(editor: Editor, format: Element['type']) {
  const isActive = isBlockActiveWithinSelection(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      Element.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true,
  })
  const newProperties = {
    type: isActive ? DEFAULT_ELEMENT_TYPE : isList ? 'list-item' : format,
  }
  Transforms.setNodes(editor, newProperties)

  if (!isActive && isList) {
    const block = {
      children: [],
      type: format as 'bulleted-list' | 'numbered-list',
    }
    Transforms.wrapNodes(editor, block)
  }
}
