import { Button, Divider, Form, Input, notification, Rate, Select } from 'antd'
import { useState } from 'react'

import { FileUpload } from '../FileUpload/FileUpload'
import { IconSelector } from '../Icons'
import { IconTypes } from '../Icons'

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
    <Form layout="vertical" onFinish={handleFinish}>
      <Form.Item label="Any learnings to share?">
        <TextArea
          placeholder="We created an overview of 10 banks and evaluated them based on x,y,z..."
          rows={4}
        />
      </Form.Item>
      <Form.Item label="Upload docs">
        <FileUpload />
      </Form.Item>
      <Form.Item>
        <Button block htmlType="submit" loading={loading} type="primary">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
