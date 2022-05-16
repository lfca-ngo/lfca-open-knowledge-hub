require('./styles.less')

import { Drawer, List } from 'antd'
import { useState } from 'react'

import {
  CompanyAchievementFragment,
  CompanyAchievementMiniFragment,
} from '../../services/lfca-backend'
import { AchievementCard, AchievementCardMini } from '../AchievementCard'

interface AchievementsListProps {
  achievements: CompanyAchievementFragment[]
}

export const AchievementsList = ({ achievements }: AchievementsListProps) => {
  const [drawerVisible, setDrawerVisible] = useState(false)
  return (
    <div>
      <List
        className="achievements-list"
        dataSource={achievements}
        grid={{
          gutter: 16,
          lg: 3,
          md: 3,
          sm: 2,
          xl: 3,
          xs: 1,
          xxl: 3,
        }}
        renderItem={(item) => (
          <List.Item>
            <AchievementCard
              achievement={item}
              onClickEdit={() => setDrawerVisible(true)}
            />
          </List.Item>
        )}
      />

      <Drawer onClose={() => setDrawerVisible(false)} visible={drawerVisible}>
        Form
      </Drawer>
    </div>
  )
}

interface AchievementsListMiniProps {
  achievements: CompanyAchievementMiniFragment[]
}

export const AchievementsListMini = ({
  achievements,
}: AchievementsListMiniProps) => {
  return (
    <List
      className="achievements-list-mini"
      dataSource={achievements}
      renderItem={(item) => (
        <List.Item>
          <AchievementCardMini achievement={item} />
        </List.Item>
      )}
    />
  )
}
