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
    avatar={{ shape: 'square', size: 'large' }}
    className={`event-card-skeleton`}
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
