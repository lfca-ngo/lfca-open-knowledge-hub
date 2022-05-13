import { Editor } from "slate"

import { isMarkActiveWithinSelection } from "./isMarkActiveWithinSelection"

export function toggleMark(editor, format) {
  const isActive = isMarkActiveWithinSelection(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}
