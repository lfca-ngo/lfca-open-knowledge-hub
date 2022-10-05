import { Skeleton } from 'antd'

import styles from './styles.module.less'

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
    className={styles['action-card-skeleton']}
    loading={fetching}
    paragraph={{ rows: 1 }}
  >
    {children}
  </Skeleton>
)
