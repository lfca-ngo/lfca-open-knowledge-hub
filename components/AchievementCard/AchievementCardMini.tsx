import { List, Popover } from 'antd'
import Link from 'next/link'

import {
  CompanyAchievementMiniFragment,
  isAchievementReached,
} from '../../services/lfca-backend'
import { AchievementStat, SuccessAvatar } from '.'
import styles from './styles.module.less'

interface AchievementCardMiniProps {
  achievement: CompanyAchievementMiniFragment
}

export const AchievementCardMini = ({
  achievement,
}: AchievementCardMiniProps) => {
  const achievementReached = isAchievementReached(achievement)
  return (
    <Link href={`/achievements`}>
      <div className={styles['achievement-card-mini']}>
        <SuccessAvatar isSuccess={achievementReached} size={58} />
        <div className="achievement-content">
          <div className="achievement-title">{achievement.name}</div>
          <div className="achievement-stats">
            <Popover
              content={
                <List
                  dataSource={achievement.requiredActions}
                  renderItem={(item) => <List.Item>{item.title}</List.Item>}
                />
              }
              overlayClassName="popover-sm"
              trigger="hover"
            >
              <div>
                <AchievementStat
                  completedCount={
                    achievement.completedRequiredCompanyActionsCount
                  }
                  targetCount={achievement.requiredActions.length}
                />
              </div>
            </Popover>

            <Popover
              content={`You have to fulfill at least ${achievement.minCompletedCompanyActionsCount} actions in total`}
              overlayClassName="popover-sm"
              trigger="hover"
            >
              <div>
                <AchievementStat
                  completedCount={achievement.completedCompanyActionsCount}
                  targetCount={achievement.minCompletedCompanyActionsCount || 0}
                />
              </div>
            </Popover>
          </div>
        </div>
      </div>
    </Link>
  )
}
