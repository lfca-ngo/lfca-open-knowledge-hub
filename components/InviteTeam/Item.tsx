import { CopyOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Input, List, message, Popover, Row } from 'antd'
import React from 'react'

import { UserInviteFragment } from '../../services/lfca-backend'
import { APP_BASE_URL, copyTextToClipboard } from '../../utils'
import { SIGN_UP } from '../../utils/routes'

const BTN_WIDTH = 60

interface InviteItemProps {
  item: UserInviteFragment
  onMinimumInvited?: () => void
}

export const InviteItem = ({ item, onMinimumInvited }: InviteItemProps) => {
  const inviteLink = `${APP_BASE_URL}${SIGN_UP}?email=${encodeURIComponent(
    item.email
  )}`

  const handleCopy = () => {
    copyTextToClipboard(inviteLink, (note: string, hasCopied: boolean) => {
      if (hasCopied) {
        message.success(note)
        onMinimumInvited?.()
      } else message.error(note)
    })
  }

  return (
    <List.Item
      actions={[
        <Popover
          content={
            <Row>
              <Input.Group compact>
                <Input
                  disabled
                  style={{ width: `calc(100% - ${BTN_WIDTH}px` }}
                  value={inviteLink}
                />
                <Button
                  icon={<CopyOutlined />}
                  onClick={handleCopy}
                  style={{ width: `${BTN_WIDTH}px` }}
                />
              </Input.Group>
            </Row>
          }
          key="mail"
          title={'Copy & Share the link'}
        >
          <Button ghost icon={<MessageOutlined />}>
            Invite via Message
          </Button>
        </Popover>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar className="wine-inverse" icon={<UserOutlined />} />}
        title={item.email || 'Anonymous'}
      />
    </List.Item>
  )
}
