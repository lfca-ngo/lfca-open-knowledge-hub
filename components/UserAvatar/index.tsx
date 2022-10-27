import { MailOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, AvatarProps, Button, Popover } from 'antd'
import React from 'react'

import { UserAvatarFragment } from '../../services/lfca-backend'

interface UserAvatarProps {
  user?: UserAvatarFragment | null
  avatarProps?: AvatarProps
}

export const UserAvatar = ({ user, avatarProps = {} }: UserAvatarProps) => {
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
      open={!user?.email ? false : undefined}
    >
      {user?.picture ? (
        <Avatar className="blue" src={user.picture} {...avatarProps} />
      ) : (
        <Avatar
          className="blue-inverse"
          icon={<UserOutlined />}
          {...avatarProps}
        />
      )}
    </Popover>
  )
}
