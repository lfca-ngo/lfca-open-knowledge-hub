import type { NextPage } from 'next'

import { Main, Section, SiderLayout } from '../../components/Layout'
import { ADMIN_NAV } from '../../utils/navs'
import { withAuth } from '../../utils/with-auth'

const AdminCompanies: NextPage = () => {
  return (
    <SiderLayout nav={ADMIN_NAV}>
      <Main>
        <Section title="Companies" titleSize="big">
          Please use the{' '}
          <a
            href="https://leaders-for-climate-action.web.app/"
            rel="noreferrer"
            target="_blank"
          >
            old app
          </a>{' '}
          for companies until we finished the migration process
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default withAuth(AdminCompanies, { adminOnly: true })
