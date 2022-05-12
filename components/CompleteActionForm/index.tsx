import { UploadOutlined } from '@ant-design/icons'
import { Button, Form, Input, Upload } from 'antd'

import { Section } from '../Layout'

const { TextArea } = Input

export const CompleteActionForm = () => {
  const handleFinish = () => {
    // TODO: send to server
  }

  return (
    <Section title="Complete Action">
      <Form layout="vertical" onFinish={handleFinish}>
        <Form.Item label="Any learnings to share?">
          <TextArea placeholder="We created an overview of 10 banks and evaluated them based on x,y,z..." />
        </Form.Item>
        <Form.Item label="Upload docs">
          <Upload>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button block htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Section>
  )
}
