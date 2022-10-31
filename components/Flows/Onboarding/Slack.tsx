import { SlackOutlined } from '@ant-design/icons'
import { Button, Space, Tag } from 'antd'

import { SLACK_INVITE_URL } from '../../../utils'
import { withAuth } from '../../../utils/with-auth'
import { DefaultStepProps } from './..'

const SlackContent = ({ onNext, onPrev, title }: DefaultStepProps) => {
  return (
    <div>
      <Tag className="super-text">{title}</Tag>
      <h1>{`Join our Slack Channel ⭐️`}</h1>
      <div className="description">
        {`Our Slack channel is the place to talk directly to other community members and our team.`}
      </div>

      <a href={SLACK_INVITE_URL} rel="noreferrer" target="_blank">
        <Button block icon={<SlackOutlined />} size="large" type="primary">
          Join our Slack Channels
        </Button>
      </a>
      <Space style={{ marginTop: '20px' }}>
        <Button onClick={onNext} size="large">
          Continue
        </Button>
        <Button onClick={onPrev} size="large" type="link">
          Back
        </Button>
      </Space>
    </div>
  )
}

export const Slack = withAuth(SlackContent)

export const SlackSide = () => {
  return null
}
