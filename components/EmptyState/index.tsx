import { Space } from 'antd'
import classNames from 'classnames'

import styles from './styles.module.less'

export interface EmptyStateProps {
  alignment?: 'left' | 'center'
  bordered?: boolean
  icon?: React.ReactNode
  size?: 'large' | 'small'
  title: string
  text: React.ReactNode
  actions?: React.ReactNode[]
  withBackground?: boolean
}

export const EmptyState = ({
  actions,
  alignment = 'center',
  bordered,
  icon,
  size = 'large',
  text,
  title,
  withBackground = false,
}: EmptyStateProps) => {
  return (
    <div
      className={classNames(styles['empty-state'], alignment, size, {
        bordered: bordered,
        'with-background': withBackground,
      })}
    >
      <header className="title">
        {icon && <div className="icon">{icon}</div>}
        <div>{title}</div>
      </header>
      <div className="text">{text}</div>

      {actions && (
        <Space className="actions">{actions?.map((action) => action)}</Space>
      )}
    </div>
  )
}
