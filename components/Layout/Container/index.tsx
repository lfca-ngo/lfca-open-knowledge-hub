require('./styles.less')

import classNames from 'classnames'

export const Container = ({
  children,
  type,
}: {
  children: React.ReactNode
  type?: 'lg'
}) => <div className={classNames('container', type)}>{children}</div>
