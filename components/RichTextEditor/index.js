require('./styles.less')

import isHotkey from 'is-hotkey'
import React from 'react'
import { createEditor, Transforms } from 'slate'
import { withHistory } from 'slate-history'
import { Editable, Slate, withReact } from 'slate-react'

import { Element, Leaf, Toolbar } from './components'
import { HOTKEYS } from './config'
import {
  withEscapeListsOnReturn,
  withLinks,
  withMarkdownShortcuts,
} from './plugins'
import { createEmptyValue, toggleMark } from './utils'

export const RichTextEditor = ({ disabled, initialValue, onChange }) => {
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
     * manually if we need to controll the value from outside
     * See: https://github.com/ianstormtaylor/slate/releases/tag/slate-react%400.67.0
     */
    editor.children = initialValue || createEmptyValue()
    Transforms.deselect(editor)
    onChange(editor.children)
  }, [initialValue])

  const renderElement = React.useCallback((props) => <Element {...props} />, [])
  const renderLeaf = React.useCallback((props) => <Leaf {...props} />, [])

  return (
    <div className="richtext-editor">
      <Slate
        editor={editor}
        onChange={onChange}
        value={initialValue || createEmptyValue()} // This is only the initial value
      >
        <Toolbar disabled={disabled} />
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
          }}
          placeholder="Type something"
          readOnly={disabled}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
      </Slate>
    </div>
  )
}
