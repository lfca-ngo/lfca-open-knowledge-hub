import type { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

import { AchievementsListMini } from '../../components/AchievementsList'
import {
  ActionsCarousel,
  CompanyActionListItemFragmentWithRootCategory,
} from '../../components/ActionsCarousel'
import { ActionsList } from '../../components/ActionsList'
import { ContentList } from '../../components/ContentList'
import { EventsList } from '../../components/EventsList'
import { getEventsByParticipationStatus } from '../../components/EventsList/utils'
import { Main, Section, Sider, SiderLayout } from '../../components/Layout'
import { PayWall } from '../../components/PayWall'
import { usePersistentNavigation } from '../../hooks/usePersistentNavigation'
import categoryTreeData from '../../public/data/_category-tree-data.json'
import {
  ContentfulContentCollectionFields,
  RootCategoryLookUpProps,
} from '../../services/contentful'
import { CategoryTreeProps } from '../../services/contentful'
import { fetchContentCollectionById } from '../../services/contentful/fetch-all-content-collections'
import {
  EMPTY_ACTIONS,
  useCompanyActionsListQuery,
  useEventsQuery,
} from '../../services/lfca-backend'
import { ACTIONS_NAV } from '../../utils/navs'
import { withAuth } from '../../utils-server-only'

interface HomePageProps {
  content: ContentfulContentCollectionFields
  categoryTree: CategoryTreeProps
}

const Home: NextPage<HomePageProps> = ({ content }: HomePageProps) => {
  const rootCategoryLookUp: RootCategoryLookUpProps =
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
        <Section title="What's next?" titleSize="big">
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
            events={error ? [] : eventsByParticipation.participatingEvents}
            fetching={fetching}
            isAllowedToJoin={true}
            participatingEvents={
              error ? [] : eventsByParticipation.participatingEvents
            }
            type="compact"
          />
        </Section>

        <Section title="Links">
          <ContentList content={content} type="mini-list" />
        </Section>
      </Sider>
    </SiderLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const content = await fetchContentCollectionById('community')

  return {
    props: {
      content,
    },
  }
}

export default withAuth(Home)
