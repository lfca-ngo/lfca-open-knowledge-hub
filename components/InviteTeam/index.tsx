require('./styles.less')

import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, List, message } from 'antd'
import React from 'react'

import {
  useCreateUserInviteMutation,
  useUserInvitesQuery,
} from '../../services/lfca-backend'
import { InviteItem } from './Item'

interface InviteTeamProps {
  onMinimumInvited?: () => void
}

export const InviteTeam = ({ onMinimumInvited }: InviteTeamProps) => {
  // useUserInviteMutation
  const [{ fetching: isCreatingInvite }, createUserInvite] =
    useCreateUserInviteMutation()
  const [{ data: invitesData, fetching: isFetchingInvites }, refreshInvites] =
    useUserInvitesQuery({})
  const userInvites = invitesData?.userInvites || []

  const handleAddEmail = ({ email }: { email: string }) => {
    createUserInvite({
      input: {
        email,
      },
    }).then(({ error }) => {
      if (error) message.error(error.message)
      else {
        message.success('Invite sent')
        // @David, I assume we can do this more elegantly?
        refreshInvites({ requestPolicy: 'network-only' })
      }
    })
  }

  return (
    <div className="invite-team">
      <Form className="add-email" layout="inline" onFinish={handleAddEmail}>
        <Form.Item className="email-input" name="email">
          <Input placeholder="tom@company.co" size="large" />
        </Form.Item>
        <Form.Item>
          <Button
            block
            htmlType="submit"
            icon={<PlusOutlined />}
            loading={isCreatingInvite}
            size="large"
            type="primary"
          >
            Add
          </Button>
        </Form.Item>
      </Form>

      <List
        className="users-list"
        dataSource={userInvites}
        loading={isFetchingInvites}
        renderItem={(item) => (
          <InviteItem item={item} onMinimumInvited={onMinimumInvited} />
        )}
      />
    </div>
  )
}
