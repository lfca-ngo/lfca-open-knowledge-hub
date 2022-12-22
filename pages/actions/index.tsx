import type { GetStaticProps, NextPage } from 'next'
import React from 'react'

import { ActionsList } from '../../components/ActionsList'
import { Main, Section, TopNavLayout } from '../../components/Layout'
import {
  ContentfulActionFields,
  fetchAllActions,
} from '../../services/contentful'

interface DashboardProps {
  actions: ContentfulActionFields[]
}

const Home: NextPage<DashboardProps> = ({ actions }) => {
  return (
    <TopNavLayout>
      <Main>
        <div style={{ margin: '20px 0 0', textAlign: 'center' }}>
          <h1 style={{ fontSize: '40px' }}>Browse our action modules</h1>
        </div>

        <Section bordered={false} id="browse-actions">
          <ActionsList
            actionListItemProps={{
              renderAsLink: true,
              unselectText: 'View',
            }}
            actions={actions}
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

export default Home
