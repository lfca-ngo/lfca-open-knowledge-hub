import { Button, Form, Input } from 'antd'

import { UserFragment } from '../../services/lfca-backend'

interface UserFormProps {
  initialValues?: Partial<UserFragment>
  onSubmit: (values: Partial<UserFragment>) => void
}

export const UserForm = ({ initialValues, onSubmit }: UserFormProps) => {
  return (
    <Form initialValues={initialValues} layout="vertical" onFinish={onSubmit}>
      <Form.Item label="First name" name="firstName">
        <Input />
      </Form.Item>
      <Form.Item label="Last name" name="lastName">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          Save
        </Button>
      </Form.Item>
    </Form>
  )
}
