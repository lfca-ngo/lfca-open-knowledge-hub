import { Avatar, Button, Divider, List } from 'antd'
import React from 'react'

import { ContentfulActionFields } from '../../services/contentful'
import {
  CompanyActionListItemFragment,
  useActionCommentsQuery,
} from '../../services/lfca-backend'
import { scrollToId } from '../Layout/SectionWrapper'
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

        <LogoGroup
          data={action.recentCompaniesDoing}
          label={`${action.companiesDoingCount} working on this`}
          size={'large'}
        />

        {latestComments && (
          <>
            <Divider orientation="left" orientationMargin={0}>
              Latest
            </Divider>

            <List
              dataSource={latestComments}
              loading={fetching}
              renderItem={(item) => (
                <List.Item className="news">
                  <Avatar size="small" src={item.author?.picture} />
                  <div className="text">
                    {item.author?.firstName} left a comment
                  </div>
                </List.Item>
              )}
            />

            <Divider
              className="see-all"
              orientation="center"
              orientationMargin={0}
            >
              <Button onClick={() => scrollToId('community')} size="small">
                See all
              </Button>
            </Divider>
          </>
        )}
      </div>
    </div>
  )
}
