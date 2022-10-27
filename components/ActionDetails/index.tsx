import { Skeleton } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'
import React from 'react'

import { CompanyActionListItemFragmentWithRootCategory } from '../ActionsCarousel'
import { rootTreeMetaData } from '../ActionsList/utils'
import styles from './styles.module.less'

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
      className={styles['action-details-skeleton']}
      loading={fetching}
      paragraph={{ rows: 1 }}
    >
      <div className={styles['action-details']}>
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
      </div>
    </Skeleton>
  )
}
