import { Card, Skeleton } from 'antd'

export const EventCardSkeleton = ({
  children,
  fetching,
  small,
}: {
  children: React.ReactNode
  fetching?: boolean
  small?: boolean
}) => (
  <Skeleton
    active
    className={`event-card-skeleton${small ? ' small' : ''}`}
    loading={fetching}
    paragraph={{
      rows: small ? 3 : 6,
      width: small ? ['80%', '80%', '80%'] : undefined,
    }}
    title={{
      width: small ? '100%' : '40%',
    }}
  >
    {children}
  </Skeleton>
)
