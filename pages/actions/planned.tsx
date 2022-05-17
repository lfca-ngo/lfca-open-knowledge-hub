import type { NextPage } from 'next'

import { Main, Section, SiderLayout } from '../../components/Layout'
import { ACTIONS_NAV } from '../../utils/navs'
import { withAuth } from '../../utils/with-auth'

const PlannedActions: NextPage = () => {
  return (
    <SiderLayout nav={ACTIONS_NAV}>
      <Main>
        <Section title="Planned Actions" titleSize="big">
          Planned Actions
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default withAuth(PlannedActions)
