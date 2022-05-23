import { Skeleton } from 'antd'

export const ActionCardSkeleton = ({
  children,
  fetching,
}: {
  children: React.ReactNode
  fetching?: boolean
}) => (
  <Skeleton
    active
    avatar={{ shape: 'square', size: 'large' }}
    className="action-card-skeleton"
    loading={fetching}
    paragraph={{ rows: 1 }}
  >
    {children}
  </Skeleton>
)
