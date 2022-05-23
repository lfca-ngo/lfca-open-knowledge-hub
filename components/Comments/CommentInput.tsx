import React from 'react'
import { Descendant } from 'slate'

import { RichTextEditor } from '../RichTextEditor'

interface CommentInputProps {
  disabled?: boolean
  onChange?: (value: Descendant[]) => void
  value?: Descendant[]
}

export const CommentInput = ({
  disabled,
  onChange,
  value,
}: CommentInputProps) => {
  const [initialValue] = React.useState(value)

  return (
    <RichTextEditor
      disabled={!!disabled}
      initialValue={initialValue}
      onChange={onChange}
      placeholder="The most difficult thing was solving xyz. Luckily we found this overview that really helped us (attached)."
    />
  )
}
