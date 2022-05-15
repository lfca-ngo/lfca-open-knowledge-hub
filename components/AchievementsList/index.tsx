require('./styles.less')

import { Drawer, List } from 'antd'
import { useState } from 'react'

import { AchievementCard, AchievementCardMini } from '../AchievementCard'

export const AchievementsList = (props: any) => {
  const [drawerVisible, setDrawerVisible] = useState(false)
  return (
    <div>
      <List
        className="achievements-list"
        dataSource={props.achievements}
        grid={{
          gutter: 16,
          lg: 3,
          md: 3,
          sm: 2,
          xl: 3,
          xs: 1,
          xxl: 3,
        }}
        renderItem={(item: any) => (
          <List.Item>
            <AchievementCard
              {...item}
              openDrawer={() => setDrawerVisible(true)}
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

export const AchievementsListMini = (props: any) => {
  return (
    <List
      className="achievements-list-mini"
      dataSource={props.achievements}
      renderItem={(item: any) => (
        <List.Item>
          <AchievementCardMini {...item} />
        </List.Item>
      )}
    />
  )
}
