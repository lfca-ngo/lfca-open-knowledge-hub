require('./styles.less')

import React, { useState } from "react"
import { Button, Avatar, Popover, Input, List, Row, Col } from "antd"
import { CopyToClipboard } from "../CopyToClipboard"
import { PlusOutlined, UserOutlined, MailOutlined, CloseOutlined, MessageOutlined } from '@ant-design/icons'

export const InviteTeam = ({ onMinimumInvited }: { onMinimumInvited?: any }) => {
  const [emailInput, setEmailInput] = useState("")

  const handleAddEmail = () => {
    // createNewInvite(
    //   {
    //     roles: ["OFFICERS"],
    //     email: emailInput,
    //     companyId: companyUid,
    //     country: companyCountry || DEFAULT_LOCALE,
    //     isUsed: false,
    //   },
    //   () => setEmailInput("")
    // )
  }

  return (
    <div className="invite-team">
      <Input.Group compact>

        <Input
          style={{ width: `calc(100% - 120px)` }}
          placeholder="tom@company.co"
          size="large"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        />

        <Button
          style={{ width: '120px' }}
          size="large"
          icon={<PlusOutlined />}
          type="primary"
          block
          // loading={createStatus === "BUSY"}
          onClick={handleAddEmail}
        >
          Add
        </Button>
      </Input.Group>


      <Row>
        <List
          className="users-list"
          // dataSource={validInviteCodes}
          renderItem={(item) => (
            <InviteItem onMinimumInvited={onMinimumInvited} item={item} />
          )}
        />
      </Row>
    </div>
  )
}

const InviteItem = ({ item, onMinimumInvited }: { item: any, onMinimumInvited: any }) => {
  const [slackVisible, setSlackVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMinimumInvited, setHasMinimumInvited] = useState(false)
  const [status, setStatus] = useState('IDLE')

  const isSent = status === "SUCCESS"
  const hasError = status === "ERROR"

  const onAfterInvite = (err: any) => {
    setIsLoading(false)
    if (err) setStatus("ERROR")
    else {
      setStatus("SUCCESS")
      handleHasInvited()
    }
  }

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
          onClick={handleEmailInvite}
          type="primary"
          size="large"
          icon={<MailOutlined />}
          ghost
          key="mail"
          disabled={isSent}
          loading={isLoading}
        >
          {isSent
            ? "Invite sent!"
            : hasError
              ? "Failed. Try again"
              : "Invite via Mail"}
        </Button>,
        <Popover
          visible={slackVisible}
          title={
            <div className="popover-title">
              <div className="title">
                Copy the link below and share it via Slack
              </div>
              <Button
                icon={<CloseOutlined />}
                type="link"
                size="small"
                onClick={() => setSlackVisible(false)}
              />
            </div>
          }
          content={
            <Row>
              <Col xs={14}>
                <Input size="large" disabled value={item?.linkUrl} />
              </Col>
              <Col xs={{ span: 9, offset: 1 }}>
                <CopyToClipboard
                  onAfterCopy={handleHasInvited}
                  block
                  hidePreview
                  text={item?.linkUrl}
                />
              </Col>
            </Row>
          }
          key="mail"
        >
          <Button
            type="primary"
            icon={<MessageOutlined />}
            size="large"
            onClick={() => setSlackVisible(!slackVisible)}
            ghost
          >
            Invite via Message
          </Button>
        </Popover>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar icon={<UserOutlined />} />}
        title={item.email || "Anonymous"}
      />
    </List.Item>
  )
}
