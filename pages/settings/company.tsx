import type { NextPage } from 'next'

import { Main, Section, SiderLayout } from '../../components/Layout'
import { Container } from '../../components/Layout/Container'
import { SETTINGS_NAV } from '../../utils/navs'
import { withAuth } from '../../utils/with-auth'

const CompanySettings: NextPage = () => {
  return (
    <SiderLayout nav={SETTINGS_NAV}>
      <Main>
        <Section title="Company" titleSize="big">
          <Container>Hello</Container>
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default withAuth(CompanySettings)
