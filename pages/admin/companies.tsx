import type { NextPage } from 'next'

import { Main, Section, SiderLayout } from '../../components/Layout'
import { NAV } from './data'

const AdminCompanies: NextPage = () => {
  return (
    <SiderLayout nav={NAV}>
      <Main>
        <Section title="Users" titleSize="big">
          Something
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default AdminCompanies
