import { EllipsisOutlined } from '@ant-design/icons'
import { Button, ButtonProps, Dropdown, Menu, MenuProps } from 'antd'

import styles from './styles.module.less'

interface DropdownSelectorProps {
  buttonContent?: React.ReactNode
  buttonProps?: ButtonProps
  items: MenuProps['items']
  onSelect: ({ key }: { key: string }) => void
}

export const DropdownSelector = ({
  buttonContent,
  buttonProps = { icon: <EllipsisOutlined /> },
  items,
  onSelect,
}: DropdownSelectorProps) => {
  return (
    <Dropdown
      overlay={<Menu items={items} onSelect={onSelect} />}
      overlayClassName={styles['top-nav-dropdown']}
    >
      <Button {...buttonProps}>{buttonContent}</Button>
    </Dropdown>
  )
}
