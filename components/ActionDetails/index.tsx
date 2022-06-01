require('./styles.less')

import {
  CalendarOutlined,
  CheckOutlined,
  UndoOutlined,
} from '@ant-design/icons'
import { Button, Skeleton, Space } from 'antd'
import Image from 'next/image'
import React from 'react'

import { CompanyActionListItemFragment } from '../../services/lfca-backend'
import { ActionStats } from '../ActionStats'

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
      className="action-details-skeleton"
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
          companiesCompletedCount={action.companiesCompletedCount}
          recentCompaniesCompleted={action.recentCompaniesCompleted}
        />
      </div>
    </Skeleton>
  )
}

interface ActionsBarProps {
  fetchingCompleted: boolean
  fetchingPlanned: boolean
  isCompleted: boolean
  isPlanned: boolean
  onComplete: () => void
  onPlan: () => void
}

export const ActionsBar = ({
  fetchingCompleted,
  fetchingPlanned,
  isCompleted,
  isPlanned,
  onComplete,
  onPlan,
}: ActionsBarProps) => {
  return (
    <div className="actions-bar">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Button
          block
          ghost={isCompleted}
          icon={isCompleted ? <UndoOutlined /> : <CheckOutlined />}
          loading={fetchingCompleted}
          onClick={onComplete}
          size="large"
          type={isCompleted ? 'default' : 'primary'}
        >
          {isCompleted ? 'Mark as incomplete' : 'Mark as done'}
        </Button>
        {!isCompleted && (
          <Button
            block
            ghost
            icon={isPlanned ? <UndoOutlined /> : <CalendarOutlined />}
            loading={fetchingPlanned}
            onClick={onPlan}
            size="large"
          >
            {isPlanned ? 'Mark as unplanned' : 'Mark as planned'}
          </Button>
        )}
      </Space>
    </div>
  )
}
