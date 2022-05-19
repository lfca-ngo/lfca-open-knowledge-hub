import type { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import { AchievementsListMini } from '../../components/AchievementsList'
import { ActionsCarousel } from '../../components/ActionsCarousel'
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
  sortCompanyActionsByTag,
  useCompanyAchievementsMiniQuery,
  useCompanyActionsQuery,
} from '../../services/lfca-backend'
import { ACTIONS_NAV } from '../../utils/navs'
import { withAuth } from '../../utils/with-auth'
import { useScrollPosition } from '../../hooks/useScrollPosition'

interface HomePageProps {
  content: ContentfulContentCollectionFields[]
}

const Home: NextPage<HomePageProps> = ({ content }: HomePageProps) => {
  // Restore scroll beteen navigation and content
  const { options, savePosition } = useScrollPosition('Dashboard_Home', true)

  console.log('options', options)

  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(options?.currentPage || 0)

  // TODO: UI for error state
  const [{ data: actionsData, fetching: fetchingActions }] =
    useCompanyActionsQuery()

  // TODO: UI for error state
  const [{ data: companyAchievementsData, fetching: fetchingAchievements }] =
    useCompanyAchievementsMiniQuery()

  const actionsByTags = React.useMemo(
    () =>
      sortCompanyActionsByTag(
        actionsData?.companyActions || EMPTY_ACTIONS_ARRAY
      ),
    [actionsData]
  )

  /**
   * Highlight actions that are
   * - required or mandatory for one of the company's achievements
   * - not completed
   */
  const highlightedActions = React.useMemo(
    () =>
      (actionsData?.companyActions || EMPTY_ACTIONS_ARRAY).filter(
        (companyAction) =>
          (companyAction.recommendedForCompanyAchievementIds.length > 0 ||
            companyAction.requiredForCompanyAchievementIds.length > 0) &&
          !companyAction.completedAt
      ),
    [actionsData]
  )

  return (
    <SiderLayout nav={ACTIONS_NAV}>
      <Main>
        <Section className="mb-40" title="Dashboard" titleSize="big">
          <ActionsCarousel
            actions={highlightedActions}
            fetching={fetchingActions}
            onSelect={(action) => {
              router.push(`/action/${action.contentId}`)
            }}
          />
        </Section>
        <Section bordered={false} title="Browse all actions">
          <ActionsList
            actionListItemProps={{
              onCtaClick: () => savePosition({ currentPage: currentPage }),
            }}
            actionsByTags={actionsByTags}
            fetching={fetchingActions}
            pagination={{
              current: currentPage,
              defaultCurrent: options?.currentPage || currentPage,
              onChange: (page) => setCurrentPage(page),
            }}
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

export default withAuth(Home)
