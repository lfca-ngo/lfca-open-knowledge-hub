import { Button, Space, Tag } from 'antd'

import { withAuth } from '../../../utils/with-auth'
import { DefaultStepProps } from './..'

const ShareContent = ({ onNext, onPrev }: DefaultStepProps) => {
  return (
    <div>
      <Tag className="super-text">Company Info</Tag>
      <h1>{`Share`}</h1>
      <div className="description">{`and use Slack`}</div>

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

export const Share = withAuth(ShareContent)

export const ShareSide = () => {
  return null
}
