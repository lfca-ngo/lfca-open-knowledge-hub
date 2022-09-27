require('./styles.less')

import { Skeleton } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'
import React from 'react'

import { CompanyActionListItemFragmentWithRootCategory } from '../ActionsCarousel'
import { rootTreeMetaData } from '../ActionsList/utils'
import { ActionStats } from '../ActionStats'

interface ActionDetailsProps {
  action: CompanyActionListItemFragmentWithRootCategory
  fetching: boolean
}

export const ActionDetails = ({ action, fetching }: ActionDetailsProps) => {
  // TODO: UI for error state
  const rootCategoryMetaData = rootTreeMetaData[action.rootCategory]

  return (
    <Skeleton
      active
      avatar={{ shape: 'square', size: 'large' }}
      className="action-details-skeleton"
      loading={fetching}
      paragraph={{ rows: 1 }}
    >
      <div className="action-details">
        <div
          className={classNames('root-category', rootCategoryMetaData?.color)}
        >
          {rootCategoryMetaData?.icon}
          <div className="name">{rootCategoryMetaData?.name}</div>
        </div>
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
          commentAttachmentCount={action?.commentAttachmentCount}
          commentCount={action.commentCount}
          companiesDoingCount={action.companiesDoingCount}
          recentCompaniesDoing={action.recentCompaniesDoing}
        />
      </div>
    </Skeleton>
  )
}
