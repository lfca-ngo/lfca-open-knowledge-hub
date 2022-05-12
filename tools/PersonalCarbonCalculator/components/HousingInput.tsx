import React from 'react'
import { InputNumber, Select } from 'antd'

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
          type="text"
          placeholder={placeholderValue?.flatsize || 1}
          min={1}
          value={value && value.flatsize}
          onChange={onFlatsizeChange}
          style={{ width: '100px', marginRight: '6px' }}
        />
        m².
      </div>
      <div className="line">
        <span>We are </span>
        <InputNumber
          type="text"
          placeholder={placeholderValue?.flatmates || 1}
          min={1}
          value={value && value.flatmates}
          onChange={onFlatmatesChange}
          style={{ width: '100px', marginRight: '6px' }}
        />
        <span>people in our household.</span>
      </div>
      <div className="line">
        <span>We heat with </span>
        <Select
          onSelect={onHeattypeChange}
          value={value && value.heattype}
          placeholder="Please select your heating type"
          style={{ maxWidth: '280px', marginRight: '6px' }}
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
