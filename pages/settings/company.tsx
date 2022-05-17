import type { NextPage } from 'next'

import { Main, Section, SiderLayout } from '../../components/Layout'
import { withAuth } from '../../services/firebase'
import { SETTINGS_NAV } from '../../utils/navs'

const CompanySettings: NextPage = () => {
  return (
    <SiderLayout nav={SETTINGS_NAV}>
      <Main>
        <Section title="Company" titleSize="big">
          Hello
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default withAuth(CompanySettings)
