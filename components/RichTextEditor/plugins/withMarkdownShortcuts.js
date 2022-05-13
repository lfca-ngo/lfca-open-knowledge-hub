import { Editor, Element, Range, Transforms } from 'slate'

const SHORTCUTS = {
  '*': {
    type: 'list-item',
    wrap: 'bulleted-list',
  },
  '+': {
    type: 'list-item',
    wrap: 'bulleted-list',
  },
  '-': {
    type: 'list-item',
    wrap: 'bulleted-list',
  },
  '1.': {
    type: 'list-item',
    wrap: 'numbered-list',
  },
}

export function withMarkdownShortcuts(editor) {
  const { insertText } = editor

  editor.insertText = (text) => {
    const { selection } = editor

    if (text === ' ' && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection
      const block = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      })
      const path = block ? block[1] : []
      const start = Editor.start(editor, path)
      const range = { anchor, focus: start }
      const beforeText = Editor.string(editor, range)
      const mapping = SHORTCUTS[beforeText]

      if (mapping) {
        const { type, wrap } = mapping
        Transforms.select(editor, range)
        Transforms.delete(editor)
        const newProperties = {
          type,
        }
        Transforms.setNodes(editor, newProperties, {
          match: (n) => Editor.isBlock(editor, n),
        })

        if (wrap) {
          const wrapper = {
            children: [],
            type: wrap,
          }
          Transforms.wrapNodes(editor, wrapper, {
            match: (n) =>
              !Editor.isEditor(n) &&
              Element.isElement(n) &&
              n.type === 'list-item',
          })
        }

        return
      }
    }

    insertText(text)
  }

  return editor
}
