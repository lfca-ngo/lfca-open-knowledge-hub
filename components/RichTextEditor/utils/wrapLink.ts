import { Editor, Range, Transforms } from 'slate'

import { Link } from '../types'
import { getEntryByTypeFromSelection } from './getEntryByTypeFromSelection'
import { unwrapLink } from './unwrapLink'

export function wrapLink(editor: Editor, url: string) {
  const existingLinkInSelection = getEntryByTypeFromSelection(editor, 'link')
  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)

  if (isCollapsed && existingLinkInSelection) {
    // Just update the existing link
    const [, existingLinkPath] = existingLinkInSelection
    Transforms.setNodes(
      editor,
      {
        url,
      },
      {
        at: existingLinkPath,
      }
    )
    return
  }

  if (existingLinkInSelection) {
    // Remove any existing links within selection
    unwrapLink(editor)
  }

  // If now text to wrap is selected and NO existing link is present at the current position,
  // we insert a new element
  const shouldInsertNewElement = isCollapsed && !existingLinkInSelection

  const link = {
    children: shouldInsertNewElement ? [{ text: url }] : [],
    type: 'link',
    url,
  } as Link

  if (shouldInsertNewElement) {
    Transforms.insertNodes(editor, [
      link,
      {
        text: ' ',
      },
    ])
  } else {
    Transforms.wrapNodes(editor, link, { split: true })
  }
  Transforms.collapse(editor, { edge: 'end' })
}
