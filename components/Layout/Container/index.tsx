import classNames from 'classnames'

import styles from './styles.module.less'

export const Container = ({
  children,
  type,
}: {
  children: React.ReactNode
  type?: 'lg'
}) => <div className={classNames(styles.container, type)}>{children}</div>
