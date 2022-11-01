import { SlackOutlined } from '@ant-design/icons'
import { Button, Space, Tag } from 'antd'

import { SLACK_INVITE_URL } from '../../../utils'
import { withAuth } from '../../../utils/with-auth'
import { DefaultStepProps } from './..'

const SlackContent = ({ onNext, onPrev, title }: DefaultStepProps) => {
  return (
    <div>
      <Tag className="super-text">{title}</Tag>
      <h1>{`Next: Join us on Slack ⭐️`}</h1>
      <div className="description">
        Share experiences with other Climate Officers from our community. Access
        sub-industry channels where you can connect with members from your
        sector that are facing similar challenges (e.g. food, finance,
        mobility).
      </div>

      <a href={SLACK_INVITE_URL} rel="noreferrer" target="_blank">
        <Button block icon={<SlackOutlined />} size="large">
          Join our Slack Channel
        </Button>
      </a>
      <Space style={{ marginTop: '20px' }}>
        <Button onClick={onNext} size="large" type="primary">
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
