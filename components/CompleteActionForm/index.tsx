import { Button, Divider, Form, Input, notification, Rate, Select } from 'antd'
import { useState } from 'react'

import { FileUpload } from '../FileUpload/FileUpload'
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
  actionId,
  onComplete,
}: {
  actionId: string
  onComplete: () => void
}) => {
  const [provider, setProvider] = useState('')
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
    <Section title="Complete Action">
      <Form layout="vertical" onFinish={handleFinish}>
        {actionId === 'companyPledge' && (
          <>
            <Form.Item label="Did you work with a service provider?">
              <Select
                onSelect={(val: string) => setProvider(val)}
                placeholder="Select an option..."
              >
                <Select.Option key="planetly">Planetly</Select.Option>
                <Select.Option key="cp">Climate Partner</Select.Option>
                <Select.Option key="a">Plan A</Select.Option>
                <Select.Option key="">None</Select.Option>
              </Select>
            </Form.Item>
            {provider && (
              <>
                <Form.Item label="What was your overall experience?">
                  <Rate />
                </Form.Item>
                <Form.Item label="Describe your experience">
                  <TextArea
                    placeholder="The service was great, but it was a bit pricy..."
                    rows={6}
                  />
                </Form.Item>
              </>
            )}
            <Divider />
          </>
        )}

        <Form.Item label="Any learnings to share?">
          <TextArea
            placeholder="We created an overview of 10 banks and evaluated them based on x,y,z..."
            rows={6}
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
    </Section>
  )
}
