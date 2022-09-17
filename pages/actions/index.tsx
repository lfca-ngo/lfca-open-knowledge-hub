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
import { EventsList } from '../../components/EventsList'
import { getEventsByParticipationStatus } from '../../components/EventsList/utils'
import { Main, Section, Sider, SiderLayout } from '../../components/Layout'
import { PayWall } from '../../components/PayWall'
import { useScrollPosition } from '../../hooks/useScrollPosition'
import { ContentfulContentCollectionFields } from '../../services/contentful'
import {
  CategoryTreesProps,
  fetchMainCategoryTrees,
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
  categoryTrees: CategoryTreesProps
}

const Home: NextPage<HomePageProps> = ({
  categoryTrees,
  content,
}: HomePageProps) => {
  const router = useRouter()
  const { resetPosition } = useScrollPosition(LS_ACTION_LIST, false)

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
      (actionsData?.companyActions || EMPTY_ACTIONS).filter(
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
          // title="Browse all actions"
        >
          {/* When leaving this page in any direction other than action detail page
          delete the browsing position */}
          <ActionsList
            actionListItemProps={{
              renderAsLink: true,
            }}
            actions={actionsData?.companyActions || EMPTY_ACTIONS}
            categoryTrees={categoryTrees}
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
          <PayWall
            popoverContent={
              <div>
                <p>
                  Mastermind Groups are small teams of 5-10 community members
                  that are grouped by industry, challenge or region. They meet
                  monthly and share their progress, practical learnings and
                  support each other.
                </p>
              </div>
            }
            popoverTitle="What's waiting for you"
          >
            <EventsList
              appliedEvents={error ? [] : eventsByParticipation.appliedEvents}
              events={error ? [] : eventsByParticipation.participatingEvents}
              fetching={fetching}
              participatingEvents={
                error ? [] : eventsByParticipation.participatingEvents
              }
              type="compact"
            />
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
  const categoryTrees = await fetchMainCategoryTrees()

  return {
    props: {
      categoryTrees,
      content,
    },
  }
}

export default withAuth(Home)
