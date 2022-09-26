require('./styles.less')

import { MinusOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import { ChangeEventHandler } from 'react'

interface RemovableInputProps {
  icon?: React.ReactElement
  value?: string
  onChange?: (value: string) => void
  onRemove?: () => void
  placeholder?: string
}

export const RemovableInput = ({
  icon,
  onChange,
  onRemove,
  placeholder = '',
  value = '',
}: RemovableInputProps) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange?.(e.target.value)
  }

  return (
    <div className="removable-input">
      {icon && icon}
      <Input.Group compact>
        <Input
          onChange={handleChange}
          placeholder={placeholder}
          value={value || ''}
        />
        <Button icon={<MinusOutlined />} onClick={onRemove} />
      </Input.Group>
    </div>
  )
}
