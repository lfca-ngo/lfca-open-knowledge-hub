import { Button, Space, Tag } from 'antd'

import { DefaultStepProps } from './..'

export const Personalize = ({ onNext }: DefaultStepProps) => {
  return (
    <div>
      <Tag className="super-text">Company Info</Tag>
      <h1>{`Where are you on your climate journey? 🎯`}</h1>
      <div className="description">
        {`Let's start with a simple exercise: Did you already take climate action in your company? Which actions have you taken and what have you learned?`}
      </div>

      <Space>
        <Button onClick={onNext} size="large" type="primary">
          Join group
        </Button>
      </Space>
    </div>
  )
}

export const PersonalizeSide = () => {
  return <div style={{ minWidth: '300px' }}></div>
}
