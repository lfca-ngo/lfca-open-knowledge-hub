require('./styles.less')

import { CalendarOutlined, CheckOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import Image from 'next/image'
import React from 'react'

import { ActionStats } from '../ActionCard'

export const ActionDetails = ({ action }: { action: any }) => {
  return (
    <div className="action-details">
      <div className="action-title">
        <h1>{action?.title}</h1>
        <div className="hero">
          <div className="wrapper">
            <Image
              layout="fill"
              objectFit="cover"
              src={action?.heroImage.url}
            />
          </div>
        </div>
      </div>
      <ActionStats />
    </div>
  )
}

export const ActionsBar = ({
  onComplete,
  onPlanned,
}: {
  onComplete?: any
  onPlanned?: any
}) => {
  return (
    <div className="actions-bar">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Button
          block
          icon={<CheckOutlined />}
          onClick={onComplete}
          size="large"
          type="primary"
        >
          Mark as done
        </Button>
        <Button
          block
          ghost
          icon={<CalendarOutlined />}
          onClick={onPlanned}
          size="large"
        >
          Mark as planned
        </Button>
      </Space>
    </div>
  )
}
