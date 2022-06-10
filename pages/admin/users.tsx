import type { GetStaticProps, NextPage } from 'next'

import { AdminUsersList } from '../../components/AdminUsersList'
import { Main, Section, SiderLayout } from '../../components/Layout'
import { Country, fetchAllCountries } from '../../services/contentful'
import { ADMIN_NAV } from '../../utils/navs'
import { withAuth } from '../../utils/with-auth'

interface AdminUsersProps {
  countries: Country[]
}

const AdminUsers: NextPage<AdminUsersProps> = ({ countries }) => {
  return (
    <SiderLayout nav={ADMIN_NAV}>
      <Main>
        <Section title="Users" titleSize="big">
          <AdminUsersList countries={countries} />
        </Section>
      </Main>
    </SiderLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const countries = await fetchAllCountries()

  return {
    props: {
      countries,
    },
  }
}

export default withAuth(AdminUsers, { adminOnly: true })
