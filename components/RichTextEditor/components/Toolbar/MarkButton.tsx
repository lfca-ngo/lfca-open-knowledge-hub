import { Button } from 'antd'
import { Text } from 'slate'
import { useSlate } from 'slate-react'

import { isMarkActiveWithinSelection, toggleMark } from '../../utils'

interface MarkButtonProps {
  disabled: boolean
  format: keyof Omit<Text, 'text'>
  icon: React.ReactNode
}

export const MarkButton = ({ disabled, format, icon }: MarkButtonProps) => {
  const editor = useSlate()
  return (
    <Button
      disabled={disabled}
      icon={icon}
      onMouseDown={(e) => {
        e.preventDefault()
        toggleMark(editor, format)
      }}
      type={isMarkActiveWithinSelection(editor, format) ? 'primary' : 'default'}
    />
  )
}
