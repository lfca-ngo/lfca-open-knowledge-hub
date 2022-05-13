import { Range, Transforms } from "slate"

import { getEntryByTypeFromSelection } from "./getEntryByTypeFromSelection"
import { unwrapLink } from "./unwrapLink"

export function wrapLink(editor, url) {
  const existingLinkInSelection = getEntryByTypeFromSelection(editor, "link")
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
    type: "link",
    url,
    // If a new element is created, we use the URL as text
    children: shouldInsertNewElement ? [{ text: url }] : [],
  }

  if (shouldInsertNewElement) {
    Transforms.insertNodes(editor, [
      link,
      {
        text: " ",
      },
    ])
  } else {
    Transforms.wrapNodes(editor, link, { split: true })
  }
  Transforms.collapse(editor, { edge: "end" })
}
