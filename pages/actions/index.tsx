import type { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

import { AchievementsListMini } from '../../components/AchievementsList'
import {
  ActionsCarousel,
  CompanyActionListItemFragmentWithRootCategory,
} from '../../components/ActionsCarousel'
import { ActionsList } from '../../components/ActionsList'
import { ContentListMini } from '../../components/ContentList'
import { EventsList } from '../../components/EventsList'
import { getEventsByParticipationStatus } from '../../components/EventsList/utils'
import { Main, Section, Sider, SiderLayout } from '../../components/Layout'
import { PayWall } from '../../components/PayWall'
import { usePersistentNavigation } from '../../hooks/usePersistentNavigation'
import * as categoryTreeData from '../../next-fetch-during-build/data/_category-tree-data.json'
import { ContentfulContentCollectionFields } from '../../services/contentful'
import {
  CategoryTreeProps,
  fetchRootCategoryTree,
} from '../../services/contentful'
import { fetchAllContentCollections } from '../../services/contentful/fetch-all-content-collections'
import {
  EMPTY_ACTIONS,
  useCompanyActionsListQuery,
  useEventsQuery,
} from '../../services/lfca-backend'
import { ACTIONS_NAV } from '../../utils/navs'
import { withAuth } from '../../utils/with-auth'

interface HomePageProps {
  content: ContentfulContentCollectionFields[]
  categoryTree: CategoryTreeProps
}

const Home: NextPage<HomePageProps> = ({ content }: HomePageProps) => {
  const rootCategoryLookUp: { [key: string]: string } =
    categoryTreeData.rootCategoryLookUp
  const { resetPosition } = usePersistentNavigation(false)
  const router = useRouter()

  // Fetch events to show upcoming
  const [{ data, error, fetching }] = useEventsQuery()
  const eventsByParticipation = getEventsByParticipationStatus(data?.events)

  // TODO: UI for error state
  const [{ data: actionsData, fetching: fetchingActions }] =
    useCompanyActionsListQuery()

  /**
   * Highlight actions that are
   * - required or mandatory for one of the company's achievements
   * - not completed
   * - planned
   */
  const highlightedActions = useMemo(
    () =>
      (actionsData?.companyActions || EMPTY_ACTIONS)
        .filter(
          (companyAction) =>
            (companyAction.recommendedForCompanyAchievementIds.length > 0 ||
              companyAction.requiredForCompanyAchievementIds.length > 0 ||
              companyAction.plannedAt !== null) &&
            !companyAction.completedAt
        )
        .map(
          (action) =>
            ({
              ...action,
              // we are using the first category to define the root category
              rootCategory: rootCategoryLookUp[action.categories[0]?.id],
            } as CompanyActionListItemFragmentWithRootCategory)
        ),
    [actionsData, rootCategoryLookUp]
  )

  return (
    <SiderLayout nav={ACTIONS_NAV}>
      <Main>
        <Section className="mb-40" title="Dashboard" titleSize="big">
          <ActionsCarousel
            actions={highlightedActions}
            fetching={fetchingActions}
            onSelect={(action) => {
              resetPosition()
              router.push(`/action/${action.contentId}`)
            }}
          />
        </Section>
        <Section bordered={false} id="browse-actions">
          <ActionsList
            actionListItemProps={{
              renderAsLink: true,
              unselectText: 'View',
            }}
            actions={actionsData?.companyActions || EMPTY_ACTIONS}
            fetching={fetchingActions}
          />
        </Section>
      </Main>
      <Sider>
        <Section title="Achievements">
          <PayWall
            popoverContent={
              <div>
                <p>
                  By unlocking achievements, you get your own custom microsite
                  to share your climate action journey in realtime with your
                  team and partners.
                </p>
              </div>
            }
            popoverTitle="What's waiting for you"
          >
            <AchievementsListMini />
          </PayWall>
        </Section>
        <Section title="Your groups">
          <EventsList
            appliedEvents={error ? [] : eventsByParticipation.appliedEvents}
            events={error ? [] : eventsByParticipation.participatingEvents}
            fetching={fetching}
            participatingEvents={
              error ? [] : eventsByParticipation.participatingEvents
            }
            type="compact"
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
  const categoryTree = await fetchRootCategoryTree()

  return {
    props: {
      categoryTree,
      content,
    },
  }
}

export default withAuth(Home)
