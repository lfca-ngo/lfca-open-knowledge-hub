import { SlackOutlined } from '@ant-design/icons'
import { Button, Space, Tag } from 'antd'

import { trackEvent } from '../../../services/analytics'
import { SLACK_INVITE_URL } from '../../../utils'
import { withAuth } from '../../../utils/with-auth'
import { DefaultStepProps } from '..'

export const SlackContent = ({ onNext, onPrev }: DefaultStepProps) => {
  const joinSlack = () => {
    // track event
    trackEvent({
      name: 'joinedSlackDuringOnboarding',
    })
    // open url
    window.open(SLACK_INVITE_URL, '_blank')
  }

  const goNext = () => {
    // completed form
    trackEvent({
      name: 'completedSlackStep',
    })
    onNext?.()
  }

  return (
    <div>
      <Tag className="super-text">Slack</Tag>
      <h1>{`Join us on Slack! ⭐️`}</h1>
      <div className="description">
        Our Slack channel is where members get help, share insights and meet
        other members.
      </div>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Button block icon={<SlackOutlined />} onClick={joinSlack} size="large">
          Join our Slack Channel
        </Button>

        <Space>
          <Button onClick={goNext} size="large" type="primary">
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
