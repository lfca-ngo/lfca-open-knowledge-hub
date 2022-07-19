require('./styles.less')

import { Skeleton } from 'antd'
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
