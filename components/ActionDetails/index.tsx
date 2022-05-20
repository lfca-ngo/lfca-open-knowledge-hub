require('./styles.less')

import { CalendarOutlined, CheckOutlined } from '@ant-design/icons'
import { Button, Skeleton, Space } from 'antd'
import Image from 'next/image'
import React from 'react'

import { CompanyActionListItemFragment } from '../../services/lfca-backend'
import { ActionStats } from '../ActionCard'

interface ActionDetailsProps {
  action: CompanyActionListItemFragment
  fetching: boolean
}

export const ActionDetails = ({ action, fetching }: ActionDetailsProps) => {
  // TODO: UI for error state

  return (
    <Skeleton
      active
      avatar={{ shape: 'square', size: 'large' }}
      loading={fetching}
      paragraph={{ rows: 1 }}
    >
      <div className="action-details">
        <div className="action-title">
          <h1>{action.title}</h1>
          <div className="hero">
            <div className="wrapper">
              {action.heroImage?.url ? (
                <Image
                  alt={action.title || ''}
                  layout="fill"
                  objectFit="cover"
                  src={action.heroImage.url}
                />
              ) : null}
            </div>
          </div>
        </div>
        <ActionStats
          commentAttachmentCount={action.commentAttachmentCount}
          commentCount={action.commentCount}
          recentCompaniesCompleted={action.recentCompaniesCompleted}
        />
      </div>
    </Skeleton>
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
