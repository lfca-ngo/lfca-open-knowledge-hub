import classNames from 'classnames'

import styles from './styles.module.less'

export const Container = ({
  alignment,
  children,
  fillAvailableSpace,
  size,
}: {
  alignment?: 'left' | 'center' | 'right'
  children: React.ReactNode
  fillAvailableSpace?: string
  size?: 'lg' | 'md' | 'xs'
}) => (
  <div className={classNames(styles.container, size, `alignment-${alignment}`)}>
    {fillAvailableSpace && (
      <div className={classNames('fill-available-space', fillAvailableSpace)} />
    )}
    {children}
  </div>
)
