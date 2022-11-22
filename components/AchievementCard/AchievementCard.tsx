import { CheckCircleOutlined } from '@ant-design/icons'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Button, Card, Divider, Space } from 'antd'
import classNames from 'classnames'

import {
  CompanyAchievementFragment,
  isAchievementReached,
} from '../../services/lfca-backend'
import { ShowMore } from '../ShowMore'
import { ActionsStatusList, SuccessAvatar } from './'
import styles from './styles.module.less'

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
      className={classNames(styles['achievement-card'], {
        'achievement-reached': achievementReached,
      })}
    >
      <header>
        <SuccessAvatar isSuccess={achievementReached} size={72} />
      </header>
      <main>
        <div className="achievement-title">
          {achievement.name}
          {achievementReached && (
            <CheckCircleOutlined className="title-icon green" />
          )}
        </div>
        <div className="achievement-description">
          <ShowMore
            maxHeight={100}
            text={
              achievement.description &&
              documentToReactComponents(achievement.description)
            }
          />
        </div>
        <Divider />
        <ActionsStatusList
          items={achievement.requiredActions}
          title={'Required Actions'}
        />
        <ActionsStatusList
          items={achievement.recommendedActions}
          title={'Recommended Actions'}
        />
      </main>

      <footer>
        {achievement.micrositeUrl ? (
          <Space direction="vertical" style={{ width: '100%' }}>
            <Button
              block
              onClick={() => onClickEdit(achievement)}
              type="primary"
            >
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
      </footer>
    </Card>
  )
}
