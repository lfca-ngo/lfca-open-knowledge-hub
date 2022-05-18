import type { NextPage } from 'next'

import { Main, Section, SiderLayout } from '../../components/Layout'
import { withAuth } from '../../utils/with-auth'

const AdminUsers: NextPage = () => {
  return (
    <SiderLayout>
      <Main>
        <Section title="Admin Dashboard" titleSize="big">
          coming back one day
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default withAuth(AdminUsers, { adminOnly: true })
