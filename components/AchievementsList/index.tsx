import { List } from 'antd'

import { AchievementCard } from '../AchievementCard'

export const AchievementsList = (props: any) => {
  return (
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
          <AchievementCard {...item} />
        </List.Item>
      )}
    />
  )
}
