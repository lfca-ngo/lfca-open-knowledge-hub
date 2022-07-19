import {
  InfoCircleOutlined,
  LockOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons'
import { Button, Popover } from 'antd'
import Link from 'next/link'
import React from 'react'

import { SETTINGS_SUBSCRIPTION } from '../../../utils/routes'
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
            <Link href={SETTINGS_SUBSCRIPTION} key="upgrade" passHref>
              <Button icon={<ThunderboltOutlined />} type="primary">
                Upgrade
              </Button>
            </Link>,
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
