import type { GetStaticProps, NextPage } from 'next'
import React from 'react'

import { ActionsList } from '../../components/ActionsList'
import { Main, Section, TopNavLayout } from '../../components/Layout'
import {
  ContentfulActionFields,
  fetchAllActions,
} from '../../services/contentful'
import { EMPTY_ACTIONS } from '../../services/lfca-backend'
import { ACTIONS_NAV } from '../../utils/navs'
import { withAuth } from '../../utils-server-only'

interface DashboardProps {
  actions: ContentfulActionFields[]
}

const Home: NextPage<DashboardProps> = ({ actions }) => {
  return (
    <TopNavLayout nav={ACTIONS_NAV}>
      <Main>
        <h1>Browse our action modules</h1>
        <Section bordered={false} id="browse-actions">
          <ActionsList
            actionListItemProps={{
              renderAsLink: true,
              unselectText: 'View',
            }}
            actions={actions || EMPTY_ACTIONS}
            fetching={false}
          />
        </Section>
      </Main>
    </TopNavLayout>
  )
}

export const getStaticProps: GetStaticProps<DashboardProps> = async () => {
  const actionsById = await fetchAllActions()
  const actions: ContentfulActionFields[] = Object.keys(actionsById).map(
    (id) => actionsById[id]
  )

  return {
    props: {
      actions,
    },
  }
}

export default withAuth(Home)
