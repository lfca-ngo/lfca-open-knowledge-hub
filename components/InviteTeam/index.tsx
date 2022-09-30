import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, List, message } from 'antd'
import React from 'react'

import {
  useCreateUserInviteMutation,
  useUserInvitesQuery,
} from '../../services/lfca-backend'
import { InviteItem } from './Item'
import styles from './styles.module.less'

interface InviteTeamProps {
  onMinimumInvited?: () => void
}

export const InviteTeam = ({ onMinimumInvited }: InviteTeamProps) => {
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
        onMinimumInvited?.()
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

        <Form.Item shouldUpdate>
          {({ getFieldValue }) => (
            <Button
              block
              disabled={!getFieldValue('email')}
              htmlType="submit"
              icon={<PlusOutlined />}
              loading={isCreatingInvite}
              size="large"
              type={!getFieldValue('email') ? 'ghost' : 'primary'}
            >
              Add
            </Button>
          )}
        </Form.Item>
      </Form>

      <List
        className="simple-list"
        dataSource={userInvites}
        loading={isFetchingInvites}
        renderItem={(item) => (
          <InviteItem item={item} onMinimumInvited={onMinimumInvited} />
        )}
      />
    </div>
  )
}
