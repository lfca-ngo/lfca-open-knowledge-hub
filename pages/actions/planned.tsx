import { List, Skeleton } from 'antd'
import type { NextPage } from 'next'
import React from 'react'

import { ActionCardWrapper } from '../../components/ActionCard'
import { Main, Section, SiderLayout } from '../../components/Layout'
import { Container } from '../../components/Layout/Container'
import { EMPTY_ACTIONS_ARRAY } from '../../services/contentful/utils'
import { usePlannedCompanyActionsQuery } from '../../services/lfca-backend'
import { ACTIONS_NAV } from '../../utils/navs'
import { withAuth } from '../../utils/with-auth'

const PlannedActions: NextPage = () => {
  // TODO: UI for error state
  const [{ data: actionsData, fetching: fetchingActions }] =
    usePlannedCompanyActionsQuery()

  return (
    <SiderLayout nav={ACTIONS_NAV}>
      <Main>
        <Section bordered={false} title="Planned Actions" titleSize="big">
          <Container>
            <List
              dataSource={
                actionsData?.plannedCompanyActions || EMPTY_ACTIONS_ARRAY
              }
              renderItem={(item) => {
                return (
                  <List.Item>
                    <Skeleton
                      active
                      avatar={{ shape: 'square', size: 'large' }}
                      loading={fetchingActions}
                      paragraph={{ rows: 1 }}
                    >
                      <ActionCardWrapper action={item} />
                    </Skeleton>
                  </List.Item>
                )
              }}
            />
          </Container>
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default withAuth(PlannedActions)
