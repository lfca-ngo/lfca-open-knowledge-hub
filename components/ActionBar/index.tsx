import { MessageOutlined, PaperClipOutlined } from '@ant-design/icons'
import React from 'react'

import { ContentfulActionFields } from '../../services/contentful'
import { CompanyActionListItemFragment } from '../../services/lfca-backend'
import { ActionStat } from '../ActionStats'
import { LogoGroup } from '../LogoGroup'
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

        <LogoGroup
          data={action.recentCompaniesDoing}
          label={`${action.companiesDoingCount} working on this`}
          size={'large'}
        />

        <ActionStat
          color="wine-inverse"
          count={action.commentCount}
          icon={<MessageOutlined />}
          label="messages"
          size={'large'}
        />
        <ActionStat
          color="blue-inverse"
          count={action?.commentAttachmentCount}
          icon={<PaperClipOutlined />}
          label="documents"
          size={'large'}
        />
      </div>
    </div>
  )
}
