import React from 'react'
import { Descendant } from 'slate'

import { RichTextEditor } from '../RichTextEditor'

interface RichTextInputProps {
  disabled?: boolean
  onChange?: (value: Descendant[]) => void
  placeholder?: string
  value?: Descendant[]
}

export const RichTextInput = ({
  disabled,
  onChange,
  placeholder,
  value,
}: RichTextInputProps) => {
  const [initialValue] = React.useState(value)

  return (
    <RichTextEditor
      disabled={!!disabled}
      initialValue={initialValue}
      onChange={onChange}
      placeholder={placeholder}
    />
  )
}
