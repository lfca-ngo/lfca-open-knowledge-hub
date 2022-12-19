import { HistoryOutlined } from '@ant-design/icons'
import { Popover, Tag } from 'antd'

import styles from './styles.module.less'

interface ActionLastUpdatedAtProps {
  lastUpdatedAt?: Date
}

export const ActionLastUpdatedAt = ({
  lastUpdatedAt,
}: ActionLastUpdatedAtProps) => {
  const formattedDate = new Date(`${lastUpdatedAt}`).toLocaleDateString(
    'en-us',
    { day: 'numeric', month: 'long', year: 'numeric' }
  )
  return lastUpdatedAt ? (
    <Popover content="Last updated at" placement="right">
      <div className={styles['last-updated-at']}>
        <Tag icon={<HistoryOutlined />}>{formattedDate}</Tag>
      </div>
    </Popover>
  ) : null
}
