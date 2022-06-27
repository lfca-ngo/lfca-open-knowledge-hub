import {
  CheckOutlined,
  CopyOutlined,
  HourglassOutlined,
  MessageOutlined,
} from '@ant-design/icons'
import {
  Avatar,
  Button,
  Input,
  List,
  message,
  Popover,
  Row,
  Tooltip,
} from 'antd'
import React from 'react'

import { UserInviteFragment } from '../../services/lfca-backend'
import { copyTextToClipboard } from '../../utils'
import { SIGN_UP } from '../../utils/routes'

const BTN_WIDTH = 60

interface InviteItemProps {
  copyBtnInline?: boolean
  item: UserInviteFragment
  onMinimumInvited?: () => void
}

export const InviteItem = ({
  copyBtnInline,
  item,
  onMinimumInvited,
}: InviteItemProps) => {
  const inviteLink = `${
    process.env.NEXT_PUBLIC_URL
  }${SIGN_UP}?email=${encodeURIComponent(item.email)}`

  const handleCopy = () => {
    copyTextToClipboard(inviteLink, (note, hasCopied) => {
      if (hasCopied) {
        message.success(note)
        onMinimumInvited?.()
      } else message.error(note)
    })
  }

  return (
    <List.Item
      actions={
        !item.user
          ? [
              copyBtnInline ? (
                <Button
                  icon={<CopyOutlined />}
                  key="copy"
                  onClick={handleCopy}
                />
              ) : (
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
                </Popover>
              ),
            ]
          : []
      }
    >
      <List.Item.Meta
        avatar={
          item.user ? (
            <Tooltip
              title={`The user accepted your invite and joined the platform`}
            >
              <Avatar className={'green-inverse'} icon={<CheckOutlined />} />
            </Tooltip>
          ) : (
            <Tooltip
              title={`We've sent an email invite to this user. You can additionally copy & paste the invite link to send it via Slack`}
            >
              <Avatar className={'wine-inverse'} icon={<HourglassOutlined />} />
            </Tooltip>
          )
        }
        title={item.email || 'Anonymous'}
      />
    </List.Item>
  )
}
