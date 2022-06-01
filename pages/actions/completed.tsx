import { List } from 'antd'
import type { NextPage } from 'next'
import React from 'react'

import { ActionCardWrapper } from '../../components/ActionCard'
import { ActionCardSkeleton } from '../../components/ActionCard/ActionCardSkeleton'
import { Main, Section, SiderLayout } from '../../components/Layout'
import { Container } from '../../components/Layout/Container'
import { EMPTY_ACTIONS_ARRAY } from '../../services/contentful/utils'
import { useCompanyActionsListQuery } from '../../services/lfca-backend'
import { ACTIONS_NAV } from '../../utils/navs'
import { withAuth } from '../../utils/with-auth'

const CompletedActions: NextPage = () => {
  // TODO: UI for error state
  const [{ data: actionsData, fetching: fetchingActions }] =
    useCompanyActionsListQuery({
      variables: {
        input: {
          filter: {
            completed: true,
          },
        },
      },
    })

  return (
    <SiderLayout nav={ACTIONS_NAV}>
      <Main>
        <Section bordered={false} title="Completed Actions" titleSize="big">
          <Container>
            <List
              className="no-padding"
              dataSource={actionsData?.companyActions || EMPTY_ACTIONS_ARRAY}
              renderItem={(item) => {
                return (
                  <List.Item>
                    <ActionCardSkeleton fetching={fetchingActions}>
                      <ActionCardWrapper action={item} renderAsLink />
                    </ActionCardSkeleton>
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

export default withAuth(CompletedActions)
