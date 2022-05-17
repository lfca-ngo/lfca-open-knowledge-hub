require('./styles.less')

import { MinusCircleOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'

interface RemovableInputProps {
  icon?: React.ReactElement
  value?: string
  onChange?: (value: string) => void
  onRemove?: () => void
}

export const RemovableInput = ({
  icon,
  onChange,
  onRemove,
  value = '',
}: RemovableInputProps) => {
  const handleChange = (e: any) => {
    onChange?.(e.target.value)
  }

  return (
    <div className="removable-input">
      {icon && icon}
      <Input.Group compact>
        <Input
          onChange={handleChange}
          placeholder="...great UX!"
          value={value || ''}
        />
        <Button icon={<MinusCircleOutlined />} onClick={onRemove} />
      </Input.Group>
    </div>
  )
}
