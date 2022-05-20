import { Button, Form, Input } from 'antd'

import { UserFragment } from '../../services/lfca-backend'

interface UserFormProps {
  initialValues?: Partial<UserFragment>
  isLoading?: boolean
  onSubmit: (values: Partial<UserFragment>) => void
}

export const UserForm = ({
  initialValues,
  isLoading = false,
  onSubmit,
}: UserFormProps) => {
  return (
    <Form initialValues={initialValues} layout="vertical" onFinish={onSubmit}>
      <Form.Item label="First name" name="firstName">
        <Input placeholder="Greta" />
      </Form.Item>
      <Form.Item label="Last name" name="lastName">
        <Input placeholder="Thunberg" />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={isLoading} type="primary">
          Save
        </Button>
      </Form.Item>
    </Form>
  )
}
