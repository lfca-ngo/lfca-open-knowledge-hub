import { Avatar, Button, ConfigProvider, Divider, List, Skeleton } from 'antd'
import React from 'react'

import { ContentfulActionFields } from '../../services/contentful'
import {
  CompanyActionListItemFragment,
  EMPTY_COMMENTS,
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

      <>
        <Divider orientation="left" orientationMargin={0}>
          Latest
        </Divider>

        <ConfigProvider renderEmpty={() => 'No activity yet'}>
          <List
            dataSource={latestComments || EMPTY_COMMENTS}
            renderItem={(item) => (
              <List.Item className="news">
                <Skeleton
                  avatar={{ shape: 'square', size: 'small' }}
                  loading={fetching}
                  paragraph={false}
                >
                  <Avatar
                    shape="square"
                    size="small"
                    src={item.author?.picture}
                  />
                  <div className="text">
                    {item.author?.firstName} left a comment
                  </div>
                </Skeleton>
              </List.Item>
            )}
          />
        </ConfigProvider>

        <Divider className="see-all" orientation="center" orientationMargin={0}>
          <Button onClick={() => scrollToId('community')} size="small">
            See all
          </Button>
        </Divider>
      </>
    </div>
  )
}
