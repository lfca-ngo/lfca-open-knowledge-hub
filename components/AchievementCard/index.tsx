require('./styles.less')

import {
  CheckCircleFilled,
  CheckCircleOutlined,
  CloseCircleFilled,
} from '@ant-design/icons'
import { Avatar, Button, Card, List, Space } from 'antd'
import classNames from 'classnames'

import { CompanyAchievementFragment } from '../../services/lfca-backend'

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
                  <CloseCircleFilled className="wine" />
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

interface AchievementStatProps {
  targetCount: number
  completedCount: number
}

const AchievementStat = ({
  completedCount,
  targetCount,
}: AchievementStatProps) => (
  <div className="achievement-stat">
    <div className="icon">
      {completedCount >= targetCount ? (
        <CheckCircleFilled className="green" />
      ) : (
        <CloseCircleFilled className="wine" />
      )}
    </div>
    <div className="label">{`${completedCount}/${targetCount}`}</div>
  </div>
)

interface AchievementCardMiniProps {
  achievement: CompanyAchievementFragment
}

export const AchievementCardMini = ({
  achievement,
}: AchievementCardMiniProps) => {
  return (
    <div className={'achievement-card-mini'}>
      <Avatar size="default" />
      <div className="achievement-content">
        <div className="achievement-title">{achievement.name}</div>
        <div className="achievement-stats">
          <AchievementStat
            completedCount={achievement.completedRequiredCompanyActionsCount}
            targetCount={achievement.requiredActions.length}
          />
          <AchievementStat
            completedCount={achievement.completedCompanyActionsCount}
            targetCount={achievement.minCompletedCompanyActionsCount || 0}
          />
        </div>
      </div>
    </div>
  )
}
