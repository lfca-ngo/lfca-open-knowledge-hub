require('./styles.less')

import classNames from 'classnames'

interface EmptyStateProps {
  alignment?: 'left' | 'center'
  bordered?: true
  icon?: React.ReactNode
  size?: 'large' | 'small'
  title: string
  text: React.ReactNode
  actions?: React.ReactNode[]
}

export const EmptyState = ({
  actions,
  alignment = 'center',
  bordered,
  icon,
  size = 'large',
  text,
  title,
}: EmptyStateProps) => {
  return (
    <div
      className={classNames('empty-state', alignment, size, {
        bordered: bordered,
      })}
    >
      <header className="title">
        {icon && <div className="icon">{icon}</div>}
        <div>{title}</div>
      </header>
      <div className="text">{text}</div>

      {actions && (
        <div className="actions">{actions?.map((action) => action)}</div>
      )}
    </div>
  )
}
