import { Editor, Text } from 'slate'

import { isMarkActiveWithinSelection } from './isMarkActiveWithinSelection'

export function toggleMark(editor: Editor, format: keyof Omit<Text, 'text'>) {
  const isActive = isMarkActiveWithinSelection(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}
