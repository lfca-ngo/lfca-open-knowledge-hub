require('./styles.less')

import { Drawer, List, Skeleton } from 'antd'
import { useState } from 'react'

import {
  CompanyAchievementFragment,
  CompanyAchievementMiniFragment,
} from '../../services/lfca-backend'
import { AchievementCard, AchievementCardMini } from '../AchievementCard'

interface AchievementsListProps {
  achievements: CompanyAchievementFragment[]
  fetching?: boolean
}

export const AchievementsList = ({
  achievements,
  fetching,
}: AchievementsListProps) => {
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
            <Skeleton active avatar loading={fetching} paragraph={{ rows: 3 }}>
              <AchievementCard
                achievement={item}
                onClickEdit={() => setDrawerVisible(true)}
              />
            </Skeleton>
          </List.Item>
        )}
      />

      <Drawer
        className="drawer-md"
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
      >
        Form
      </Drawer>
    </div>
  )
}

interface AchievementsListMiniProps {
  achievements: CompanyAchievementMiniFragment[]
  fetching?: boolean
}

export const AchievementsListMini = ({
  achievements,
  fetching,
}: AchievementsListMiniProps) => {
  return (
    <List
      className="achievements-list-mini"
      dataSource={achievements}
      renderItem={(item) => (
        <List.Item>
          <Skeleton active avatar loading={fetching} paragraph={{ rows: 1 }}>
            <AchievementCardMini achievement={item} />
          </Skeleton>
        </List.Item>
      )}
    />
  )
}
