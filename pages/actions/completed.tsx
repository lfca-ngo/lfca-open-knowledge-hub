import type { GetStaticProps, NextPage } from 'next'
import React from 'react'

import { AchievementsListMini } from '../../components/AchievementsList'
import { ActionsList } from '../../components/ActionsList'
import { ContentListMini } from '../../components/ContentList'
import { Main, Section, Sider, SiderLayout } from '../../components/Layout'
import { ContentfulContentCollectionFields } from '../../services/contentful'
import { fetchAllContentCollections } from '../../services/contentful/fetch-all-content-collections'
import {
  EMPTY_ACHIEVEMENTS_ARRAY,
  EMPTY_ACTIONS_ARRAY,
} from '../../services/contentful/utils'
import {
  useCompanyAchievementsMiniQuery,
  useCompletedCompanyActionsQuery,
} from '../../services/lfca-backend'
import { ACTIONS_NAV } from '../../utils/navs'
import { withAuth } from '../../utils/with-auth'

interface CompletedActionsProps {
  content: ContentfulContentCollectionFields[]
}

const CompletedActions: NextPage<CompletedActionsProps> = ({ content }) => {
  // TODO: UI for error state
  const [{ data: actionsData, fetching: fetchingActions }] =
    useCompletedCompanyActionsQuery()

  // TODO: UI for error state
  const [{ data: companyAchievementsData, fetching: fetchingAchievements }] =
    useCompanyAchievementsMiniQuery()

  return (
    <SiderLayout nav={ACTIONS_NAV}>
      <Main>
        <Section bordered={false} title="Completed Actions" titleSize="big">
          <ActionsList
            actionsByTags={{
              '': actionsData?.completedCompanyActions || EMPTY_ACTIONS_ARRAY,
            }}
            fetching={fetchingActions}
          />
        </Section>
      </Main>
      <Sider>
        <Section title="Rewards">
          <AchievementsListMini
            achievements={
              companyAchievementsData?.company.program.achievements ||
              EMPTY_ACHIEVEMENTS_ARRAY
            }
            fetching={fetchingAchievements}
          />
        </Section>
        <Section title="Links">
          <ContentListMini content={content} />
        </Section>
      </Sider>
    </SiderLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const content = await fetchAllContentCollections()

  return {
    props: {
      content,
    },
  }
}

export default withAuth(CompletedActions)
