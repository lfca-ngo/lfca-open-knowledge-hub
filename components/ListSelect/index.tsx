import { Button } from 'antd'
import classNames from 'classnames'
import isEqual from 'lodash.isequal'
import { useEffect, useState } from 'react'

export type OptionKey = string | number | string[] | number[]

export interface Option {
  key: OptionKey
  label: string
  help?: string
}

interface ListSelectProps {
  grouped?: boolean
  value?: OptionKey[]
  mode?: 'multiple' | 'single'
  onChange?: (value: OptionKey[]) => void
  options?: Option[]
}

export const ListSelect = ({
  mode = 'single',
  onChange,
  options,
  value = [],
}: ListSelectProps) => {
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

  useEffect(() => {
    if (!isEqual(value, selected)) {
      setSelected(value)
    }
  }, [value, selected])

  return (
    <div className={classNames('list-select')}>
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
    </div>
  )
}
