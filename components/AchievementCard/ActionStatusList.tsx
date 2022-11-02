import {
  ArrowRightOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
} from '@ant-design/icons'
import { List } from 'antd'
import { useRouter } from 'next/router'

import { CompanyAchievementFragment } from '../../services/lfca-backend'

interface ActionsStatusListProps {
  items:
    | CompanyAchievementFragment['recommendedActions']
    | CompanyAchievementFragment['requiredActions']
  title: string
}

export const ActionsStatusList = ({ items, title }: ActionsStatusListProps) => {
  const router = useRouter()

  if (items.length < 1) return null

  return (
    <div className="action-status-list">
      <div className="achievement-section-title">{title}</div>
      <List
        dataSource={items}
        renderItem={(item) => (
          <List.Item onClick={() => router.push(`action/${item.contentId}`)}>
            <List.Item.Meta
              avatar={
                item.completedAt ? (
                  <CheckCircleFilled className="green" />
                ) : (
                  <CloseCircleFilled className="wine" />
                )
              }
              title={
                <span>
                  {item.title} <ArrowRightOutlined />
                </span>
              }
            />
          </List.Item>
        )}
      />
    </div>
  )
}
