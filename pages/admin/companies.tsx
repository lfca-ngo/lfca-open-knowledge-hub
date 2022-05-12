import type { NextPage } from 'next'

import { Main, Section, SiderLayout } from '../../components/Layout'
import { ADMIN_NAV } from '../../utils/navs'

const AdminCompanies: NextPage = () => {
  return (
    <SiderLayout nav={ADMIN_NAV}>
      <Main>
        <Section title="Users" titleSize="big">
          Something
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default AdminCompanies
