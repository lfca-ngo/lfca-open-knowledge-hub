import { CopyOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Input, List, message, Popover, Row } from 'antd'
import React from 'react'

import { UserInviteFragment } from '../../services/lfca-backend'
import { copyTextToClipboard } from '../../utils'

const BTN_WIDTH = 60

interface InviteItemProps {
  item: UserInviteFragment
  onMinimumInvited?: () => void
}

export const InviteItem = ({ item }: InviteItemProps) => {
  const handleCopy = () => {
    copyTextToClipboard('mylink', (note: string, hasCopied: boolean) => {
      if (hasCopied) {
        message.success(note)
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
                  value={'invite lin here'}
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
        avatar={<Avatar icon={<UserOutlined />} />}
        title={item.email || 'Anonymous'}
      />
    </List.Item>
  )
}
