import type { NextPage } from 'next'

import { Main, Section, SiderLayout } from '../../components/Layout'
import { ACTIONS_NAV } from '../../utils/navs'
import { withAuth } from '../../utils/with-auth'

const CompletedActions: NextPage = () => {
  return (
    <SiderLayout nav={ACTIONS_NAV}>
      <Main>
        <Section title="Completed Actions" titleSize="big">
          Completed Actions
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default withAuth(CompletedActions)
