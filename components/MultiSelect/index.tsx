import { Button } from 'antd'
import { useState } from 'react'

interface Option {
  key: string
  label: string
}

interface MultiSelectProps {
  value?: string[]
  onChange?: (value: string[]) => void
  options?: Option[]
}

export const MultiSelect = ({
  onChange,
  options,
  value = [],
}: MultiSelectProps) => {
  const [selected, setSelected] = useState(value)

  const handleChange = (value: string) => {
    // if is clicked and value is already selected, remove it
    let newSelected
    if (selected?.includes(value)) {
      newSelected = selected.filter((item) => item !== value)
    } else {
      newSelected = [...selected, value]
    }
    // trigger change
    setSelected(newSelected)
    onChange?.(newSelected)
  }

  return (
    <Button.Group className="multi-select">
      {options?.map((item) => {
        const isSelected = selected?.includes(item.key)
        return (
          <Button
            key={item.key}
            onClick={() => handleChange(item.key)}
            type={isSelected ? 'primary' : 'default'}
          >
            {item.label}
          </Button>
        )
      })}
    </Button.Group>
  )
}
