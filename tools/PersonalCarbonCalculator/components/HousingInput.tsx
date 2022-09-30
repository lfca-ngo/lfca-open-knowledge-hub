import { InputNumber, Select } from 'antd'
import React from 'react'

const { Option } = Select

interface HousingValue {
  flatsize?: number
  flatmates?: number
  heattype?: string
}

interface HousingInputProps {
  value?: HousingValue
  onChange?: (value: HousingValue) => void
  options?: any
  placeholderValue?: any
}

export const HousingInput: React.FC<HousingInputProps> = ({
  value = {},
  options,
  onChange,
  placeholderValue,
}) => {
  const triggerChange = (changedValue: {
    flatsize?: number
    flatmates?: number
    heattype?: string
  }) => {
    onChange?.({ ...value, ...changedValue })
  }

  const onFlatsizeChange = (val: number) => {
    triggerChange({ flatsize: val })
  }

  const onFlatmatesChange = (val: number) => {
    triggerChange({ flatmates: val })
  }

  const onHeattypeChange = (val: string) => {
    triggerChange({ heattype: val })
  }

  return (
    <span className="housing-input">
      <div className="line">
        <span>I live on </span>
        <InputNumber
          min={1}
          onChange={(val) => onFlatsizeChange(val ?? 0)}
          placeholder={placeholderValue?.flatsize || 1}
          style={{ marginRight: '6px', width: '100px' }}
          type="text"
          value={value && value.flatsize}
        />
        m².
      </div>
      <div className="line">
        <span>We are </span>
        <InputNumber
          min={1}
          onChange={(val) => onFlatmatesChange(val ?? 0)}
          placeholder={placeholderValue?.flatmates || 1}
          style={{ marginRight: '6px', width: '100px' }}
          type="text"
          value={value && value.flatmates}
        />
        <span>people in our household.</span>
      </div>
      <div className="line">
        <span>We heat with </span>
        <Select
          onSelect={onHeattypeChange}
          placeholder="Please select your heating type"
          style={{ marginRight: '6px', maxWidth: '280px' }}
          value={value && value.heattype}
        >
          {options.map((option: any, i: any) => (
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
