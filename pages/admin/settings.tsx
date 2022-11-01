import type { NextPage } from 'next'

import { AdminSettings } from '../../components/AdminSettings'
import { Main, Section, SiderLayout } from '../../components/Layout'
import { ADMIN_NAV } from '../../utils/navs'
import { withAuth } from '../../utils/with-auth'

const Settings: NextPage = () => {
  return (
    <SiderLayout nav={ADMIN_NAV}>
      <Main>
        <Section title="Settings" titleSize="big">
          <AdminSettings />
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default withAuth(Settings, { adminOnly: true })
