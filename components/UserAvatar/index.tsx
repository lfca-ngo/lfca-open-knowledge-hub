import { MailOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Popover } from 'antd'
import React from 'react'

import { UserAvatarFragment } from '../../services/lfca-backend'

interface UserAvatarProps {
  user?: UserAvatarFragment | null
}

export const UserAvatar = ({ user }: UserAvatarProps) => {
  const handleContactViaEmail = () => {
    location.href = `mailto:${user?.email}`
  }

  return (
    <Popover
      content={
        <Button
          icon={<MailOutlined />}
          onClick={handleContactViaEmail}
          size="small"
        >
          Contact via Email
        </Button>
      }
      visible={!user?.email ? false : undefined}
    >
      {user?.picture ? (
        <Avatar className="blue" src={user.picture} />
      ) : (
        <Avatar className="blue-inverse" icon={<UserOutlined />} />
      )}
    </Popover>
  )
}
