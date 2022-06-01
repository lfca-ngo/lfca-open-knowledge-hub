import { Button } from 'antd'
import classNames from 'classnames'
import { useState } from 'react'

type OptionKey = string | number | string[] | number[]

export interface Option {
  key: OptionKey
  label: string
}

interface MultiSelectProps {
  grouped?: boolean
  value?: OptionKey[]
  mode?: 'multiple' | 'single'
  onChange?: (value: OptionKey[]) => void
  options?: Option[]
}

export const MultiSelect = ({
  grouped = true,
  mode = 'multiple',
  onChange,
  options,
  value = [],
}: MultiSelectProps) => {
  const [selected, setSelected] = useState(value)

  const handleChange = (value: OptionKey) => {
    let newSelected

    if (selected?.includes(value)) {
      newSelected = selected.filter((item) => item !== value)
    } else {
      if (mode === 'single') {
        newSelected = [value]
      } else {
        newSelected = [...selected, value]
      }
    }
    // trigger change
    setSelected(newSelected)
    onChange?.(newSelected)
  }

  const Wrapper = grouped ? Button.Group : 'div'

  return (
    <Wrapper className={classNames('multi-select', { ungrouped: !grouped })}>
      {options?.map((item, i) => {
        const isSelected = selected?.includes(item.key)
        return (
          <Button
            key={`key-${i}`}
            onClick={() => handleChange(item.key)}
            type={isSelected ? 'primary' : 'default'}
          >
            {item.label}
          </Button>
        )
      })}
    </Wrapper>
  )
}
