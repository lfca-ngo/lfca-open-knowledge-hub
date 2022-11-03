import { Button, Form, Input } from 'antd'

export const EventSignUp = () => {
  const handleSubmit = ({ email }: { email: string }) => {
    //
  }

  return (
    <div>
      <h1>Sign Up for this Event</h1>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="email"
          rules={[
            {
              message: 'Please add a valid email',
              required: true,
              type: 'email',
            },
          ]}
        >
          <Input placeholder="nelson@impact.earth" type="email" />
        </Form.Item>
        <Form.Item>
          <Button block htmlType="submit" size="large" type="primary">
            Sign up for event
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
