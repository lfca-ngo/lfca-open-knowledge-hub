import { isValidUrl } from "../../../utils"
import { wrapLink } from "../utils"

export function withLinks(editor) {
  const { insertData, insertText, isInline } = editor

  editor.isInline = (element) => element.type === "link" || isInline(element)

  editor.insertText = (text) => {
    if (text && isValidUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertText(text)
    }
  }

  editor.insertData = (data) => {
    const text = data.getData("text/plain")

    if (text && isValidUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}
