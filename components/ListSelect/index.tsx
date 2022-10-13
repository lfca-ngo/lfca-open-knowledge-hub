import { Button } from 'antd'
import isEqual from 'lodash.isequal'
import { useEffect, useState } from 'react'

import styles from './styles.module.less'

export type OptionKey = string | number | string[] | number[]

export interface Option {
  description?: string
  icon?: React.ReactNode
  recommended?: boolean
  key: OptionKey
  label: string
  help?: string
}

interface ListSelectProps {
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
    <div className={styles['list-select']}>
      {options?.map((item, i) => {
        const isSelected = selected?.includes(item.key)
        return (
          <Button
            ghost={isSelected}
            key={`key-${i}`}
            onClick={() => handleChange(item.key)}
          >
            {item?.icon && <div className="icon-wrapper">{item?.icon}</div>}
            <div className="content">
              <div className="label">{item.label}</div>
              {item?.description && (
                <div className="short-description">{item?.description}</div>
              )}
            </div>
          </Button>
        )
      })}
    </div>
  )
}
