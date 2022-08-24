import { Skeleton } from 'antd'

export const EventCardSkeleton = ({
  children,
  compact,
  fetching,
}: {
  children: React.ReactNode
  fetching?: boolean
  compact?: boolean
}) => (
  <Skeleton
    active
    className={`event-card-skeleton${compact ? ' compact' : ''}`}
    loading={fetching}
    paragraph={{
      rows: compact ? 3 : 6,
      width: compact ? ['80%', '80%', '80%'] : undefined,
    }}
    title={{
      width: compact ? '100%' : '40%',
    }}
  >
    {children}
  </Skeleton>
)
