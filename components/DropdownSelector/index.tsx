import { EllipsisOutlined } from '@ant-design/icons'
import { Button, ButtonProps, Dropdown } from 'antd'
import classNames from 'classnames'

import styles from './styles.module.less'

export interface KeyLabel {
  key: string
  label: string
}

interface DropdownSelectorProps {
  buttonContent?: React.ReactNode
  buttonProps?: ButtonProps
  items: KeyLabel[]
  onChange?: (value: string) => void
  value?: string
}

interface OverlayMenuProps {
  activeKey?: string
  items: KeyLabel[]
  onChange?: (key: string) => void
}

const OverlayMenu = ({ activeKey, items, onChange }: OverlayMenuProps) => {
  return (
    <div className={styles['overlay-menu']}>
      <ul>
        {items?.map((item) => (
          <li
            className={classNames({
              active: activeKey === item?.key,
            })}
            key={item?.key}
            onClick={() => onChange?.(`${item?.key}`)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

export const DropdownSelector = ({
  buttonContent,
  buttonProps = { icon: <EllipsisOutlined /> },
  items,
  value,
  onChange,
}: DropdownSelectorProps) => {
  return (
    <Dropdown
      overlay={
        <OverlayMenu activeKey={value} items={items} onChange={onChange} />
      }
      overlayClassName={styles['dropdown-overlay']}
    >
      <Button className={'btn-dropdown'} {...buttonProps}>
        {buttonContent}
      </Button>
    </Dropdown>
  )
}
