import { SlackOutlined } from '@ant-design/icons'
import { Button, Space, Tag } from 'antd'
import Link from 'next/link'

import { SLACK_INVITE_URL } from '../../../utils'
import { ACTIONS } from '../../../utils/routes'

export const Slack = () => {
  return (
    <div>
      <Tag className="super-text">One last thing</Tag>
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
        <Link href={ACTIONS}>
          <Button block size="large" type="primary">
            Continue to your dashboard
          </Button>
        </Link>
      </Space>
    </div>
  )
}
