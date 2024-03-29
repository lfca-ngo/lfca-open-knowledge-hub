import isHotkey from 'is-hotkey'
import React from 'react'
import {
  createEditor,
  Descendant,
  Editor,
  Element as SlateElement,
  Transforms,
} from 'slate'
import { withHistory } from 'slate-history'
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from 'slate-react'

import { Element, Leaf, Toolbar } from './components'
import { DEFAULT_ELEMENT_TYPE, HOTKEYS } from './config'
import {
  withEscapeListsOnReturn,
  withLinks,
  withMarkdownShortcuts,
} from './plugins'
import styles from './styles.module.less'
import { createEmptyValue, toggleMark } from './utils'

interface RichTextEditorProps {
  disabled?: boolean
  initialValue?: Descendant[]
  onChange?: (value: Descendant[]) => void
  placeholder?: string
}

export const RichTextEditor = ({
  disabled,
  initialValue,
  onChange,
  placeholder,
}: RichTextEditorProps) => {
  const editor = React.useMemo(
    () =>
      withHistory(
        withReact(
          withEscapeListsOnReturn(
            withLinks(withMarkdownShortcuts(createEditor()))
          )
        )
      ),
    []
  )

  React.useEffect(() => {
    /**
     * NOTE:
     * The slate value is uncontrolled and this we need to update it's children
     * manually if we need to control the value from outside
     * See: https://github.com/ianstormtaylor/slate/releases/tag/slate-react%400.67.0
     */
    editor.children = initialValue?.length ? initialValue : createEmptyValue()
    // Deselect since the current selected node might not exist in the new value
    Transforms.deselect(editor)
    // Trigger a re-render
    editor.onChange()
  }, [editor, initialValue])

  const renderElement = React.useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  )
  const renderLeaf = React.useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  )

  return (
    <div className={styles['richtext-editor']}>
      <Slate
        editor={editor}
        onChange={(value) => {
          const isAstChange = editor.operations.some(
            (op) => op.type !== 'set_selection'
          )
          if (isAstChange) {
            onChange && onChange(value)
          }
        }}
        value={initialValue || createEmptyValue()}
      >
        <Toolbar disabled={!!disabled} />
        <Editable
          className="ant-input editable"
          disabled={disabled}
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault()
                const mark = HOTKEYS[hotkey]
                toggleMark(editor, mark)
              }
            }

            if (event.shiftKey && event.key === 'Enter') {
              const [matchingNodeEntry] = Array.from(
                Editor.nodes(editor, {
                  match: (n) =>
                    SlateElement.isElement(n) &&
                    n.type === DEFAULT_ELEMENT_TYPE,
                })
              )
              if (!matchingNodeEntry) return
              event.preventDefault()
              Editor.insertText(editor, '\n')
            }
          }}
          placeholder={placeholder}
          readOnly={disabled}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
      </Slate>
    </div>
  )
}
