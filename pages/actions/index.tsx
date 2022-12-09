import { Select } from 'antd'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

import {
  ActionsCarousel,
  CompanyActionListItemFragmentWithRootCategory,
} from '../../components/ActionsCarousel'
import { ActionsList } from '../../components/ActionsList'
import { EventsList } from '../../components/EventsList'
import { getEventsByParticipationStatus } from '../../components/EventsList/utils'
import { Main, Section, TopNavLayout } from '../../components/Layout'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { usePersistentNavigation } from '../../hooks/usePersistentNavigation'
import { useUser } from '../../hooks/user'
import categoryTreeData from '../../public/data/_category-tree-data.json'
import { RootCategoryLookUpProps } from '../../services/contentful'
import {
  EMPTY_ACHIEVEMENTS,
  EMPTY_ACTIONS,
  useCompanyAchievementsMiniQuery,
  useCompanyActionsListQuery,
  useEventsQuery,
} from '../../services/lfca-backend'
import { ACTIONS_NAV } from '../../utils/navs'
import { withAuth } from '../../utils-server-only'

const DEFAULT_ACHIEVEMENT = 'netzeroready'

const Home: NextPage = () => {
  const [{ data: companyAchievementsData, fetching: fetchingAchievements }] =
    useCompanyAchievementsMiniQuery()

  const { user } = useUser()
  const achievements =
    companyAchievementsData?.company?.program.achievements || EMPTY_ACHIEVEMENTS

  const [achievementId, setAchievementId] = useLocalStorage(
    'selected_achievement',
    DEFAULT_ACHIEVEMENT
  )
  const rootCategoryLookUp: RootCategoryLookUpProps =
    categoryTreeData.rootCategoryLookUp
  const { resetPosition } = usePersistentNavigation(false)
  const router = useRouter()

  // Fetch events to show upcoming
  const [{ data, fetching }] = useEventsQuery()
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
            (companyAction.recommendedForCompanyAchievementIds.indexOf(
              achievementId
            ) > -1 ||
              companyAction.requiredForCompanyAchievementIds.indexOf(
                achievementId
              ) > -1 ||
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
    [actionsData, achievementId, rootCategoryLookUp]
  )

  return (
    <TopNavLayout
      aside={
        <Section title="Your groups">
          <EventsList
            events={eventsByParticipation?.participatingEvents || []}
            fetching={fetching}
            isAllowedToJoin={true}
            type="compact"
          />
        </Section>
      }
      nav={ACTIONS_NAV}
      stickySidebar
    >
      <Main>
        <Section
          title={
            <div style={{ alignItems: 'center', display: 'flex' }}>
              {`What's next, ${user?.firstName}?`}

              <Select
                loading={fetchingAchievements}
                onChange={(val) => setAchievementId(val)}
                size="large"
                style={{
                  marginLeft: 'auto',
                  marginRight: '0',
                  width: '200px',
                }}
                value={achievementId}
              >
                {achievements?.map((achievement) => (
                  <Select.Option key={achievement.contentId}>
                    {achievement.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
          }
          titleSize="big"
        >
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
    </TopNavLayout>
  )
}

export default withAuth(Home)
