import type { NextPage } from 'next'

import { Main, Section, SiderLayout } from '../../components/Layout'
import { Container } from '../../components/Layout/Container'
import { SETTINGS_NAV } from '../../utils/navs'
import { withAuth } from '../../utils/with-auth'

const Plan: NextPage = () => {
  return (
    <SiderLayout nav={SETTINGS_NAV}>
      <Main>
        <Section title="Invite" titleSize="big">
          <Container>Show pricing and plans here</Container>
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default withAuth(Plan)
