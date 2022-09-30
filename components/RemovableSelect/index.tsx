import { MinusOutlined } from '@ant-design/icons'
import { Button, Input, Select } from 'antd'

import styles from './styles.module.less'

interface SelectOption {
  label?: string
  value: string
}

interface RemovableSelectProps {
  icon?: React.ReactElement
  onChange?: (value: string) => void
  onRemove?: () => void
  options: SelectOption[]
  placeholder?: string
  value?: string
}

export const RemovableSelect = ({
  icon,
  onChange,
  onRemove,
  options,
  placeholder = '',
  value = '',
}: RemovableSelectProps) => {
  return (
    <div className="removable-select">
      {icon && icon}
      <Input.Group compact>
        <Select
          getPopupContainer={(triggerNode) => triggerNode.parentElement}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
        >
          {options.map(({ label, value }) => (
            <Select.Option key={value} value={value}>
              {label || value}
            </Select.Option>
          ))}
        </Select>
        <Button icon={<MinusOutlined />} onClick={onRemove} />
      </Input.Group>
    </div>
  )
}
