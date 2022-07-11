import type { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

import { AchievementsListMini } from '../../components/AchievementsList'
import { ActionsCarousel } from '../../components/ActionsCarousel'
import {
  ActionsList,
  INITIAL_VALUES,
  LS_ACTION_LIST,
} from '../../components/ActionsList'
import { ContentListMini } from '../../components/ContentList'
import { Main, Section, Sider, SiderLayout } from '../../components/Layout'
import { PayWall } from '../../components/PayWall'
import { useScrollPosition } from '../../hooks/useScrollPosition'
import { ContentfulContentCollectionFields } from '../../services/contentful'
import { fetchAllContentCollections } from '../../services/contentful/fetch-all-content-collections'
import { EMPTY_ACTIONS_ARRAY } from '../../services/contentful/utils'
import {
  sortCompanyActionsByCategories,
  useCompanyActionsListQuery,
} from '../../services/lfca-backend'
import { ACTIONS_NAV } from '../../utils/navs'
import { withAuth } from '../../utils/with-auth'

interface HomePageProps {
  content: ContentfulContentCollectionFields[]
}

const Home: NextPage<HomePageProps> = ({ content }: HomePageProps) => {
  const router = useRouter()
  const { resetPosition } = useScrollPosition(LS_ACTION_LIST, false)

  // TODO: UI for error state
  const [{ data: actionsData, fetching: fetchingActions }] =
    useCompanyActionsListQuery()

  const actionsByCategories = useMemo(
    () =>
      sortCompanyActionsByCategories(
        actionsData?.companyActions || EMPTY_ACTIONS_ARRAY
      ),
    [actionsData]
  )

  /**
   * Highlight actions that are
   * - required or mandatory for one of the company's achievements
   * - not completed
   * - planned
   */
  const highlightedActions = useMemo(
    () =>
      (actionsData?.companyActions || EMPTY_ACTIONS_ARRAY).filter(
        (companyAction) =>
          (companyAction.recommendedForCompanyAchievementIds.length > 0 ||
            companyAction.requiredForCompanyAchievementIds.length > 0 ||
            companyAction.plannedAt !== null) &&
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
              resetPosition(INITIAL_VALUES)
              router.push(`/action/${action.contentId}`)
            }}
          />
        </Section>
        <Section
          bordered={false}
          id="browse-actions"
          title="Browse all actions"
        >
          {/* When leaving this page in any direction other than action detail page
          delete the browsing position */}
          <ActionsList
            actionListItemProps={{
              renderAsLink: true,
            }}
            actionsByCategories={actionsByCategories}
            fetching={fetchingActions}
          />
        </Section>
      </Main>
      <Sider>
        <Section title="Achievements">
          <PayWall popoverContent="This is achievements related">
            <AchievementsListMini />
          </PayWall>
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
