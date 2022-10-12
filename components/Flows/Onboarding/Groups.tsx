import { Button, Space, Tag } from 'antd'

import { DefaultStepProps } from '.'

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
  return <div style={{ minWidth: '300px' }}>Side Content</div>
}
