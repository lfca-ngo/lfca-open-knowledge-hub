import React from 'react'

import { ContentfulActionFields } from '../../services/contentful'
import { CompanyActionListItemFragment } from '../../services/lfca-backend'
import { StatusButton } from './StatusButton'
import styles from './styles.module.less'

interface ActionBarProps {
  action: CompanyActionListItemFragment
  actionDetails: ContentfulActionFields
}

export const ActionBar = ({ action, actionDetails }: ActionBarProps) => {
  return (
    <div className={styles['actions-bar']}>
      <div className="wrapper">
        <StatusButton
          action={action}
          canExpire={!!actionDetails.expiresAfterDays}
        />
      </div>
    </div>
  )
}
