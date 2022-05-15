require('./styles.less')

import { Card, List } from 'antd'
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'

const ActionsStatusList = ({
  items,
  title,
}: {
  items: any
  title?: string
}) => {
  return (
    <div>
      <div className="title">{title}</div>
      <List
        dataSource={items}
        renderItem={(item: any) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                item.completedAt ? <CheckCircleFilled /> : <CloseCircleFilled />
              }
              title={item.title}
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export const AchievementCard = (props: any) => {
  return (
    <Card className="achievement-card" onClick={props.onClick}>
      <div className="achievement-title">{props.name}</div>
      <ActionsStatusList
        items={props.recommendedActions}
        title={'Recommended Actions'}
      />
      <ActionsStatusList
        items={props.requiredActions}
        title={'Required Actions'}
      />
    </Card>
  )
}
