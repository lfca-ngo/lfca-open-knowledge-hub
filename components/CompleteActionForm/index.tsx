import { CheckCircleFilled, UploadOutlined } from '@ant-design/icons'
import { Button, Form, Input, notification, Upload } from 'antd'
import { useState } from 'react'

import { IconSelector } from '../Icons'
import { IconTypes } from '../Icons'
import { Section } from '../Layout'

const { TextArea } = Input

const openNotification = () => {
  notification.info({
    description: `The more you share, the more you'll get out of the community.`,
    icon: <IconSelector color="pink" type={IconTypes.heart} />,
    message: `Awesome, Thanks for sharing!`,
    placement: 'top',
  })
}

export const CompleteActionForm = ({
  onComplete,
}: {
  onComplete: () => void
}) => {
  const [loading, setLoading] = useState(false)

  const handleFinish = () => {
    setLoading(true)

    // TODO: send to server
    setTimeout(() => {
      onComplete()
      openNotification()
      setLoading(false)
    }, 600)
  }

  return (
    <Section title="Complete Action" titleSize="big">
      <Form layout="vertical" onFinish={handleFinish}>
        <Form.Item label="Any learnings to share?">
          <TextArea
            placeholder="We created an overview of 10 banks and evaluated them based on x,y,z..."
            rows={6}
          />
        </Form.Item>
        <Form.Item label="Upload docs">
          <Upload>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button block htmlType="submit" loading={loading} type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Section>
  )
}
