import type { NextPage } from 'next'

import { AdminEventsList } from '../../components/AdminEventsList'
import { Main, Section, SiderLayout } from '../../components/Layout'
import { ADMIN_NAV } from '../../utils/navs'
import { withAuth } from '../../utils/with-auth'

const Reviews: NextPage = () => {
  return (
    <SiderLayout nav={ADMIN_NAV}>
      <Main>
        <Section title="Events" titleSize="big">
          <AdminEventsList />
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default withAuth(Reviews, { adminOnly: true })
