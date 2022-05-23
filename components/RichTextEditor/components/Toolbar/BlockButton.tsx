import { Button } from 'antd'
import React from 'react'
import { Element } from 'slate'
import { useSlate } from 'slate-react'

import { isBlockActiveWithinSelection, toggleBlock } from '../../utils'

interface BlockButtonProps {
  disabled: boolean
  format: Element['type']
  icon: React.ReactNode
}

export const BlockButton = ({ disabled, format, icon }: BlockButtonProps) => {
  const editor = useSlate()
  return (
    <Button
      disabled={disabled}
      icon={icon}
      onMouseDown={(e) => {
        e.preventDefault()
        toggleBlock(editor, format)
      }}
      type={
        isBlockActiveWithinSelection(editor, format) ? 'primary' : 'default'
      }
    />
  )
}
