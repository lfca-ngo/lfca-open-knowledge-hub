import { SlackOutlined } from '@ant-design/icons'
import { Button, Space, Tag } from 'antd'

import { SLACK_INVITE_URL } from '../../../utils'
import { withAuth } from '../../../utils/with-auth'
import { DefaultStepProps } from '..'

export const SlackContent = ({ onNext, onPrev }: DefaultStepProps) => {
  return (
    <div>
      <Tag className="super-text">Slack</Tag>
      <h1>{`Join us on Slack! ⭐️`}</h1>
      <div className="description">
        Share experiences with other community members. Access sub-industry
        channels to connect with like-minded people from your sector that are
        facing similar challenges.
      </div>

      <Space
        direction="vertical"
        size="large"
        style={{ marginTop: '30px', width: '100%' }}
      >
        <a href={SLACK_INVITE_URL} rel="noreferrer" target="_blank">
          <Button block icon={<SlackOutlined />} size="large">
            Join our Slack Channel
          </Button>
        </a>

        <Space>
          <Button onClick={onNext} size="large" type="primary">
            Continue
          </Button>
          <Button onClick={onPrev} size="large" type="link">
            Back
          </Button>
        </Space>
      </Space>
    </div>
  )
}

export const Slack = withAuth(SlackContent)

export const SlackSide = () => {
  return null
}
