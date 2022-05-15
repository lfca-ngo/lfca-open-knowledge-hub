require('./styles.less')

import {
  CheckCircleFilled,
  CloseCircleFilled,
  CheckCircleOutlined,
} from '@ant-design/icons'
import { Card, List, Button, Space, Drawer } from 'antd'
import classNames from 'classnames'

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
                item.completedAt ? (
                  <CheckCircleFilled className="green" />
                ) : (
                  <CloseCircleFilled className="red" />
                )
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
  const achievementReached = props.requiredActions.every(
    (a: any) => a.completedAt
  )

  return (
    <Card
      className={classNames('achievement-card', {
        'achievement-reached': achievementReached,
      })}
      onClick={props.onClick}
    >
      <div className="achievement-title">
        {props.name}
        {achievementReached && (
          <CheckCircleOutlined className="title-icon green" />
        )}
      </div>
      <ActionsStatusList
        items={props.recommendedActions}
        title={'Recommended Actions'}
      />
      <ActionsStatusList
        items={props.requiredActions}
        title={'Required Actions'}
      />

      <Space direction="vertical" style={{ width: '100%' }}>
        {props.options?.map((option: any) => (
          <Button
            block
            ghost={option.ghost}
            key={option.key}
            onClick={() => props.openDrawer()}
            type={option.type}
          >
            {option.name}
          </Button>
        ))}
      </Space>
    </Card>
  )
}
