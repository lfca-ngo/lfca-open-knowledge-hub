import {
  CloseOutlined,
  MailOutlined,
  MessageOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Col, Input, List, Popover, Row } from 'antd'
import React, { useState } from 'react'

import { CopyToClipboard } from '../CopyToClipboard'

export const InviteItem = ({
  item,
  onMinimumInvited,
}: {
  item: any
  onMinimumInvited: any
}) => {
  const [slackVisible, setSlackVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMinimumInvited, setHasMinimumInvited] = useState(false)
  const [status] = useState('IDLE')

  const isSent = status === 'SUCCESS'
  const hasError = status === 'ERROR'

  // const onAfterInvite = (err: any) => {
  //   setIsLoading(false)
  //   if (err) setStatus('ERROR')
  //   else {
  //     setStatus('SUCCESS')
  //     handleHasInvited()
  //   }
  // }

  const handleHasInvited = () => {
    if (!hasMinimumInvited) {
      setHasMinimumInvited(true)
      onMinimumInvited()
    }
  }

  const handleEmailInvite = () => {
    setIsLoading(true)
    // inviteUser(item.email, item.linkUrl, authUser.companyId, onAfterInvite)
  }

  return (
    <List.Item
      actions={[
        <Button
          disabled={isSent}
          ghost
          icon={<MailOutlined />}
          key="mail"
          loading={isLoading}
          onClick={handleEmailInvite}
          size="large"
          type="primary"
        >
          {isSent
            ? 'Invite sent!'
            : hasError
            ? 'Failed. Try again'
            : 'Invite via Mail'}
        </Button>,
        <Popover
          content={
            <Row>
              <Col xs={14}>
                <Input disabled size="large" value={item?.linkUrl} />
              </Col>
              <Col xs={{ offset: 1, span: 9 }}>
                <CopyToClipboard
                  block
                  hidePreview
                  onAfterCopy={handleHasInvited}
                  text={item?.linkUrl}
                />
              </Col>
            </Row>
          }
          key="mail"
          title={
            <div className="popover-title">
              <div className="title">
                Copy the link below and share it via Slack
              </div>
              <Button
                icon={<CloseOutlined />}
                onClick={() => setSlackVisible(false)}
                size="small"
                type="link"
              />
            </div>
          }
          visible={slackVisible}
        >
          <Button
            ghost
            icon={<MessageOutlined />}
            onClick={() => setSlackVisible(!slackVisible)}
            size="large"
            type="primary"
          >
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
