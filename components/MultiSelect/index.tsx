import { InfoCircleOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import classNames from 'classnames'
import isEqual from 'lodash.isequal'
import { useEffect, useState } from 'react'

type OptionKey = string | number | string[] | number[]

export interface Option {
  key: OptionKey
  label: string
  help?: string
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

  useEffect(() => {
    if (!isEqual(value, selected)) {
      setSelected(value)
    }
  }, [value, selected])

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

            {item.help && (
              <Tooltip title={item.help}>
                <InfoCircleOutlined style={{ marginLeft: '6px' }} />
              </Tooltip>
            )}
          </Button>
        )
      })}
    </Wrapper>
  )
}
