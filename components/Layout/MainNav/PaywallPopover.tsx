import {
  InfoCircleOutlined,
  LockOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons'
import { Button, Popover } from 'antd'
import React from 'react'

import { EmptyState } from '../../EmptyState'

export const PaywallPopover = ({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) => {
  return (
    <Popover
      content={
        <EmptyState
          actions={[
            <Button icon={<ThunderboltOutlined />} key="upgrade" type="primary">
              Upgrade
            </Button>,
            <Popover
              content={
                'Space for a mini video/gif showcasing the benefit and option to learn more'
              }
              key="info"
              overlayClassName="popover-lg"
              placement="left"
              title="Something"
            >
              <Button icon={<InfoCircleOutlined />} />
            </Popover>,
          ]}
          icon={<LockOutlined />}
          size="small"
          text="This app section is not available in your current plan."
          title="Locked"
        />
      }
      overlayClassName="popover-lg"
      placement="right"
      title={null}
    >
      {children}
    </Popover>
  )
}
