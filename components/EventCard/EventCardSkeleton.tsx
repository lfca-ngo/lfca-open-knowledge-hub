import { Skeleton } from 'antd'

import { EventCardProps } from '.'

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
    className={`event-card-skeleton${type}`}
    loading={fetching}
    paragraph={{
      rows: type === 'compact' ? 3 : 6,
      width: type === 'compact' ? ['80%', '80%', '80%'] : undefined,
    }}
    title={{
      width: type === 'compact' ? '100%' : '40%',
    }}
  >
    {children}
  </Skeleton>
)
