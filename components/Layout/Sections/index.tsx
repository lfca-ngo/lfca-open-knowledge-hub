import classNames from 'classnames'

import styles from './styles.module.less'

export const Main = ({ children }: { children: React.ReactNode }) => (
  <div className={styles['main-section']}>{children}</div>
)

export const Sider = ({ children }: { children: React.ReactNode }) => (
  <div className={styles['sider-section']}>{children}</div>
)

export const Section = ({
  bordered = true,
  children,
  className,
  id,
  title,
  titleSize = 'default',
}: {
  children?: React.ReactNode
  id?: string
  title?: React.ReactNode | string
  titleSize?: 'big' | 'default' | 'small'
  className?: string
  bordered?: boolean
}) => (
  <div
    className={classNames(styles['page-section'], className, titleSize, {
      bordered: bordered,
      'without-title': !title,
    })}
    id={id}
  >
    {title && <h2 className="section-title">{title}</h2>}
    <div className="section-content">{children}</div>
  </div>
)
