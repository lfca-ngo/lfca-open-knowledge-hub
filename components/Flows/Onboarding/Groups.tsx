import { Button, Space, Tag } from 'antd'

import { DefaultStepProps } from './..'

// const GROUPS_FEATURES = [
//   { subtitle: '4 sessions a 1h with 10-20 members', title: 'Format' },
//   { subtitle: 'Meet and mingle with peers', title: 'Get to know us' },
//   { subtitle: 'How to build a good climate strategy', title: 'Outcome' },
// ]

export const Groups = ({ onNext }: DefaultStepProps) => {
  return (
    <div>
      <Tag className="super-text">Company Info</Tag>
      <h1>{`Let’s get together! 🥳`}</h1>
      <div className="description">
        {`Our group formats are the heartbeat of our community. Every new member starts with our free onboarding sessions. During the webinar you will get to know other members and learn how to build a climate strategy.`}
      </div>

      <Space>
        <Button onClick={onNext} size="large" type="primary">
          Join group
        </Button>
      </Space>
    </div>
  )
}

export const GroupsSide = () => {
  return (
    <div>
      {/* <List
        bordered
        className="simple-bordered-list"
        dataSource={GROUPS_FEATURES}
        renderItem={(item) => (
          <List.Item>
            <div className="title">{item.title}</div>
            <div className="subtitle">{item.subtitle}</div>
          </List.Item>
        )}
      /> */}
    </div>
  )
}
