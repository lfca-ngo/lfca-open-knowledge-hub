import type { GetStaticProps, NextPage } from 'next'

import { AdminUsersList } from '../../components/AdminUsersList'
import { Main, Section, SiderLayout } from '../../components/Layout'
import {
  Country,
  fetchAllCountries,
  fetchAllPrograms,
  Program,
} from '../../services/contentful'
import { ADMIN_NAV } from '../../utils/navs'
import { withAuth } from '../../utils-server-only'

interface AdminUsersProps {
  countries: Country[]
  programs: Program[]
}

const AdminUsers: NextPage<AdminUsersProps> = ({ countries, programs }) => {
  return (
    <SiderLayout nav={ADMIN_NAV}>
      <Main>
        <Section title="Users" titleSize="big">
          <AdminUsersList countries={countries} programs={programs} />
        </Section>
      </Main>
    </SiderLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const countries = await fetchAllCountries()
  const programs = await fetchAllPrograms()

  return {
    props: {
      countries,
      programs,
    },
  }
}

export default withAuth(AdminUsers, { adminOnly: true })
