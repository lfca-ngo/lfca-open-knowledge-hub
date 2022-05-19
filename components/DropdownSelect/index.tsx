require('./styles.less')

import { AppstoreOutlined, CheckOutlined } from '@ant-design/icons'
import { Badge, Button, Dropdown, Menu } from 'antd'
import classNames from 'classnames'
import React, { useState } from 'react'

interface ItemProps {
  label: string
  value: string
}

interface DropdownSelectProps {
  value?: string[]
  onChange?: (value: string[]) => void
  items: ItemProps[]
  placeholder?: string
  singleMode?: boolean
  onSelect?: (value: string[]) => void
}

export const DropdownSelect = ({
  value = [],
  onChange,
  items = [],
  singleMode = false,
  onSelect,
  placeholder = 'Please select',
}: DropdownSelectProps) => {
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState(value)
  const isEmpty = selected.length === 0
  const hasSingleSelectedItem = selected.length === 1
  const [firstItem] = selected
  const firstItemContent = items.find((i) => i.value === firstItem)
  const firstItemLabel = firstItemContent?.label || firstItem

  const triggerChange = (changedValue: string[]) => {
    onChange?.(changedValue)
  }

  const onItemSelect = ({ key }: { key: string }) => {
    let newSelected = selected.includes(key)
      ? selected.filter((v) => v !== key)
      : [...selected, key]

    if (singleMode) {
      newSelected = [key]
      setVisible(false)
    }

    setSelected(newSelected)
    onSelect && onSelect(newSelected)
    triggerChange(newSelected)
  }

  const menu = (
    <Menu data-testid="dropdown-select-menu" onClick={onItemSelect}>
      {items.map((item) => {
        const isActive = selected.includes(item.value)
        return (
          <Menu.Item
            data-testid="dropdown-select-item"
            icon={isActive && <CheckOutlined />}
            key={item.value}
          >
            {item.label}
          </Menu.Item>
        )
      })}
    </Menu>
  )

  return (
    <Dropdown
      onVisibleChange={(flag) => setVisible(flag)}
      overlay={menu}
      overlayClassName="dropdown-select"
      trigger={['click']}
      visible={visible}
    >
      <Button
        className={classNames('dropdown-select-btn', { 'is-empty': isEmpty })}
        data-testid="dropdown-select-btn"
        icon={<AppstoreOutlined />}
      >
        {isEmpty ? (
          placeholder
        ) : hasSingleSelectedItem ? (
          firstItemLabel
        ) : (
          <span>
            Multiple <Badge count={selected.length} />
          </span>
        )}
      </Button>
    </Dropdown>
  )
}
