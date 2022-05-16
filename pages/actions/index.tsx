import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

import { AchievementsListMini } from '../../components/AchievementsList'
import { ActionsCarousel } from '../../components/ActionsCarousel'
import { ActionsList } from '../../components/ActionsList'
import { Main, Section, Sider, SiderLayout } from '../../components/Layout'
import {
  sortCompanyActionsByTag,
  useCompanyActionsQuery,
} from '../../services/lfca-backend'
import { ACTIONS_NAV } from '../../utils/navs'

const Home: NextPage = () => {
  const router = useRouter()

  // TODO: loading & error UI
  const [{ data, error, fetching }] = useCompanyActionsQuery()

  const actionsByTags = React.useMemo(
    () => sortCompanyActionsByTag(data?.companyActions || []),
    [data]
  )

  /**
   * Highlight actions that are
   * - required or mandatory for one of the company's achievements
   * - not completed
   */
  const highlightedActions = React.useMemo(
    () =>
      (data?.companyActions || []).filter(
        (companyAction) =>
          (companyAction.recommendedForCompanyAchievementIds.length > 0 ||
            companyAction.requiredForCompanyAchievementIds.length > 0) &&
          !companyAction.completedAt
      ),
    [data]
  )

  return (
    <SiderLayout nav={ACTIONS_NAV}>
      <Main>
        <Section className="mb-40" title="Dashboard" titleSize="big">
          <ActionsCarousel
            actions={highlightedActions}
            onSelect={(action) => {
              router.push(`/action/${action.contentId}`)
            }}
          />
        </Section>
        <Section bordered={false} title="Browse all actions">
          <ActionsList actionsByTags={actionsByTags} />
        </Section>
      </Main>
      <Sider>
        <Section title="Rewards">
          <AchievementsListMini />
        </Section>
        <Section title="...">...</Section>
      </Sider>
    </SiderLayout>
  )
}

export default Home
