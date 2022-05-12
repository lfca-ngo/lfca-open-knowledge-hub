require('./styles.less')

import { PlusOutlined } from '@ant-design/icons'
import { Button, Input, List, Row } from 'antd'
import React, { useState } from 'react'

import { InviteItem } from './Item'

export const InviteTeam = ({
  onMinimumInvited,
}: {
  onMinimumInvited?: any
}) => {
  const [emailInput, setEmailInput] = useState('')

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
          onChange={(e) => setEmailInput(e.target.value)}
          placeholder="tom@company.co"
          size="large"
          style={{ width: `calc(100% - 120px)` }}
          value={emailInput}
        />

        <Button
          block
          icon={<PlusOutlined />}
          onClick={handleAddEmail}
          size="large"
          style={{ width: '120px' }}
          // loading={createStatus === "BUSY"}
          type="primary"
        >
          Add
        </Button>
      </Input.Group>

      <Row>
        <List
          className="users-list"
          // dataSource={validInviteCodes}
          renderItem={(item) => (
            <InviteItem item={item} onMinimumInvited={onMinimumInvited} />
          )}
        />
      </Row>
    </div>
  )
}
