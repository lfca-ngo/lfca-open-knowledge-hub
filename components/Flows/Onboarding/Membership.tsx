import { Button, Space, Tag } from 'antd'

import { DefaultStepProps } from './..'

export const Membership = ({ onNext }: DefaultStepProps) => {
  return (
    <div>
      <Tag className="super-text">Company Info</Tag>
      <h1>{`Last step - choose your plan 👍`}</h1>
      <div className="description">
        {`Last but not least: Choose your membership tier. If you can afford to support us with a premium subscription, you will enable us to bring lfca to others for free.`}
      </div>

      <Space>
        <Button onClick={onNext} size="large" type="primary">
          Join group
        </Button>
      </Space>
    </div>
  )
}

export const MembershipSide = () => {
  return <div style={{ minWidth: '300px' }}></div>
}
