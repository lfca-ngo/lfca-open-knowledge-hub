import { InputNumber, Select } from 'antd'
import React from 'react'

const { Option } = Select

interface ElectricityValue {
  people?: number
  type?: string
}

interface ElectricityInputProps {
  value?: ElectricityValue
  onChange?: any
  options?: any
  placeholderValue?: any
}

export const ElectricityInput: React.FC<ElectricityInputProps> = ({
  value = {},
  options,
  onChange,
  placeholderValue,
}) => {
  const triggerChange = (changedValue: { people?: number; type?: string }) => {
    onChange?.({ ...value, ...changedValue })
  }

  const onAmountChange = (val: number) => {
    triggerChange({ people: val })
  }

  const onTypeChange = (val: string) => {
    triggerChange({ type: val })
  }

  return (
    <span className="electricity-input">
      <div className="line">
        <span>We are </span>
        <InputNumber
          min={1}
          onChange={onAmountChange}
          placeholder={placeholderValue?.people || 2}
          style={{ marginRight: '6px', width: '100px' }}
          type="text"
          value={value && value.people}
        />
        people in our household.
      </div>
      <div className="line">
        <span>My electricity is </span>
        <Select
          onSelect={onTypeChange}
          placeholder="Please select your electricity type"
          style={{ marginRight: '6px', maxWidth: '280px' }}
          value={value && value.type}
        >
          {options.map((option: any, i: number) => (
            <Option key={`option-${i}`} value={option.value}>
              {option.title}
            </Option>
          ))}
        </Select>
        <span>.</span>
      </div>
    </span>
  )
}
