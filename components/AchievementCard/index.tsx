require('./styles.less')

import {
  CheckCircleFilled,
  CheckCircleOutlined,
  CloseCircleFilled,
} from '@ant-design/icons'
import { Avatar, Button, Card, List, Space } from 'antd'
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

const AchievementStat = ({
  completedCount,
  icon,
  totalCount,
}: {
  totalCount: number
  completedCount: number
  icon: any
}) => (
  <div className="achievement-stat">
    <div className="icon">{icon}</div>
    <div className="label">{`${completedCount}/${totalCount}`}</div>
  </div>
)

export const AchievementCardMini = (props: any) => {
  const completedRequiredActionsCount = props.requiredActions.filter(
    (a: any) => a.completedAt
  ).length
  const completedRecommendedActionsCount = props.recommendedActions.filter(
    (a: any) => a.completedAt
  ).length

  return (
    <div className={'achievement-card-mini'} onClick={props.onClick}>
      <Avatar size="default" />
      <div className="achievement-content">
        <div className="achievement-title">{props.name}</div>
        <div className="achievement-stats">
          <AchievementStat
            completedCount={completedRequiredActionsCount}
            icon={<CheckCircleFilled />}
            totalCount={props.requiredActions.length}
          />
          <AchievementStat
            completedCount={completedRecommendedActionsCount}
            icon={<CheckCircleFilled />}
            totalCount={props.recommendedActions.length}
          />
        </div>
      </div>
    </div>
  )
}
