import { MessageOutlined, PaperClipOutlined } from '@ant-design/icons'
import { Divider, Form, Space } from 'antd'
import React from 'react'

import { ContentfulActionFields } from '../../services/contentful'
import {
  CompanyActionListItemFragment,
  useActionCommentsQuery,
} from '../../services/lfca-backend'
import { ActionStat } from '../ActionStats'
import { LogoGroup } from '../LogoGroup'
import { StatusButton } from './StatusButton'
import styles from './styles.module.less'

interface ActionBarProps {
  action: CompanyActionListItemFragment
  actionDetails: ContentfulActionFields
}

export const ActionBar = ({ action, actionDetails }: ActionBarProps) => {
  const [{ data, fetching }] = useActionCommentsQuery({
    pause: !action.contentId,
    variables: {
      input: { actionContentId: action.contentId },
    },
  })

  const latestComments = data?.actionComments.slice(0, 3)
  console.log(latestComments)
  return (
    <div className={styles['actions-bar']}>
      <div className="wrapper">
        <h4>Action Status</h4>
        <StatusButton
          action={action}
          canExpire={!!actionDetails.expiresAfterDays}
        />

        <Divider />
        <h4>Community activity</h4>

        <Space direction="vertical">
          <LogoGroup
            data={action.recentCompaniesDoing}
            label={`${action.companiesDoingCount} working on this`}
            size={'large'}
          />

          {latestComments?.map((comment) => (
            <div>{comment.author?.firstName} left a comment</div>
          ))}

          {/* <ActionStat
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
          /> */}
        </Space>
      </div>
    </div>
  )
}
