import { CheckOutlined, HourglassOutlined } from '@ant-design/icons'
import { Avatar, Button, Form, Input, List, message, Select } from 'antd'

import {
  useCreateUserInviteMutation,
  useUserInvitesQuery,
} from '../../services/lfca-backend'
import { ROLES } from '../../utils'

const { Option } = Select

interface InviteUserFormValues {
  email: string
  role: string
  companyId: string
}

export const InviteUserForm = () => {
  const [form] = Form.useForm()

  const [{ fetching: isCreatingInvite }, createUserInvite] =
    useCreateUserInviteMutation()
  const [{ data: invitesData, fetching: isFetchingInvites }, refreshInvites] =
    useUserInvitesQuery({
      pause: true,
      variables: {
        companyId: form.getFieldValue('companyId'),
      },
    })

  const handleCreate = (allValues: InviteUserFormValues) => {
    createUserInvite({
      input: {
        ...allValues,
      },
    }).then(({ error }) => {
      if (error) message.error(error.message)
      else refreshInvites({ requestPolicy: 'network-only' })
    })
  }

  const handleChange = ({ companyId }: { companyId: string }) => {
    console.log(companyId)
    if (companyId) {
      refreshInvites()
    }
  }

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleCreate}
        onValuesChange={handleChange}
      >
        <Form.Item
          label="Company Id"
          name="companyId"
          rules={[
            {
              message: 'Please add a valid companyId',
              required: true,
            },
          ]}
        >
          <Input placeholder="Company ID" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              message: 'Please add a valid email',
              required: true,
            },
          ]}
        >
          <Input placeholder="Email" type="email" />
        </Form.Item>
        <Form.Item
          key="roles"
          label="Roles"
          name="roles"
          rules={[
            {
              message: 'Please select at least one role',
              required: true,
            },
          ]}
        >
          <Select mode="multiple" placeholder="Please select a role">
            {ROLES.filter((r) => r !== 'ADMIN').map((role) => (
              <Option key={role} value={role}>
                {role}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button loading={isCreatingInvite} type="primary">
            Invite User
          </Button>
        </Form.Item>
      </Form>

      <List
        className="simple-list"
        dataSource={invitesData?.userInvites || []}
        header={<h3>All invites</h3>}
        loading={isFetchingInvites}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  className={item.user ? 'green-inverse' : 'wine-inverse'}
                  icon={item.user ? <CheckOutlined /> : <HourglassOutlined />}
                />
              }
              title={item.email || 'Anonymous'}
            />
          </List.Item>
        )}
      />
    </div>
  )
}
