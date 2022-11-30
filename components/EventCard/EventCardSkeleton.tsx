import { Skeleton } from 'antd'
import classNames from 'classnames'

import { EventCardProps } from '.'
import styles from './styles.module.less'

export const EventCardSkeleton = ({
  children,
  fetching,
  type,
}: {
  children: React.ReactNode
  fetching?: boolean
  type?: EventCardProps['type']
}) => (
  <Skeleton
    active
    avatar={type === 'compact' ? undefined : { shape: 'square', size: 'large' }}
    className={classNames(styles['event-card-skeleton'], type)}
    loading={fetching}
    paragraph={{
      rows: type === 'compact' ? 3 : 2,
      width: '100%',
    }}
    title={{
      width: type === 'compact' ? '100%' : '40%',
    }}
  >
    {children}
  </Skeleton>
)
