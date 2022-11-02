import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'

import styles from './styles.module.less'

interface AchievementStatProps {
  targetCount: number
  completedCount: number
}

export const AchievementStat = ({
  completedCount,
  targetCount,
}: AchievementStatProps) => (
  <div className={styles['achievement-stat']}>
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
