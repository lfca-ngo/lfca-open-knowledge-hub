import type { NextPage } from 'next'

import { AdminActionsList } from '../../components/AdminActionsList'
import { Main, Section, SiderLayout } from '../../components/Layout'
import { ADMIN_NAV } from '../../utils/navs'
import { withAuth } from '../../utils/with-auth'

const AdminCompanies: NextPage = () => {
  return (
    <SiderLayout nav={ADMIN_NAV}>
      <Main>
        <Section title="Actions" titleSize="big">
          <AdminActionsList />
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default withAuth(AdminCompanies, { adminOnly: true })
