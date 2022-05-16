require('./styles.less')

import {
  CheckCircleFilled,
  CheckCircleOutlined,
  CloseCircleFilled,
} from '@ant-design/icons'
import { Avatar, Button, Card, List, Space } from 'antd'
import classNames from 'classnames'
import { useRouter } from 'next/router'

import {
  CompanyAchievementFragment,
  CompanyAchievementMiniFragment,
  isAchievementReached,
} from '../../services/lfca-backend'

interface ActionsStatusListProps {
  items:
    | CompanyAchievementFragment['recommendedActions']
    | CompanyAchievementFragment['requiredActions']
  title: string
}

const ActionsStatusList = ({ items, title }: ActionsStatusListProps) => {
  const router = useRouter()

  return (
    <div>
      <div className="title">{title}</div>
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
              title={item.title}
            />
          </List.Item>
        )}
      />
    </div>
  )
}

interface AchievementCardProps {
  achievement: CompanyAchievementFragment
  onClickEdit: (achievement: CompanyAchievementFragment) => void
}

export const AchievementCard = ({
  achievement,
  onClickEdit,
}: AchievementCardProps) => {
  const achievementReached = isAchievementReached(achievement)

  return (
    <Card
      className={classNames('achievement-card', {
        'achievement-reached': achievementReached,
      })}
    >
      <div className="achievement-title">
        {achievement.name}
        {achievementReached && (
          <CheckCircleOutlined className="title-icon green" />
        )}
      </div>
      <ActionsStatusList
        items={achievement.recommendedActions}
        title={'Recommended Actions'}
      />
      <ActionsStatusList
        items={achievement.requiredActions}
        title={'Required Actions'}
      />

      {achievement.micrositeUrl ? (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button block onClick={() => onClickEdit(achievement)} type="primary">
            Edit Microsite
          </Button>
          <Button
            block
            disabled={!achievementReached}
            ghost
            onClick={() => {
              window.open(achievement.micrositeUrl ?? undefined, '_blank')
            }}
          >
            Visit Microsite
          </Button>
        </Space>
      ) : null}
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
  achievement: CompanyAchievementMiniFragment
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
