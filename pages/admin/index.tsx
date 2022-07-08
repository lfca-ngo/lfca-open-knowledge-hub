import type { NextPage } from 'next'

import { Main, Section, SiderLayout } from '../../components/Layout'
import { withAuth } from '../../utils/with-auth'

const AdminUsers: NextPage = () => {
  return (
    <SiderLayout>
      <Main>
        <Section title="Admin Dashboard" titleSize="big">
          Find more data in our{' '}
          <a href="https://app.geckoboard.com/edit/dashboards/dash_01FAG5PNW1C50S37FY7ZJ63JJ6">
            Geckoboard
          </a>
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default withAuth(AdminUsers, { adminOnly: true })
