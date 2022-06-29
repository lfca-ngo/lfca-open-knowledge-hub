import type { GetStaticProps, NextPage } from 'next'

import { AdminCompaniesList } from '../../components/AdminCompaniesList'
import { Main, Section, SiderLayout } from '../../components/Layout'
import { Country, fetchAllCountries } from '../../services/contentful'
import { ADMIN_NAV } from '../../utils/navs'
import { withAuth } from '../../utils/with-auth'

interface AdminCompaniesProps {
  countries: Country[]
}

const AdminCompanies: NextPage<AdminCompaniesProps> = ({ countries }) => {
  return (
    <SiderLayout nav={ADMIN_NAV}>
      <Main>
        <Section title="Companies" titleSize="big">
          <AdminCompaniesList countries={countries} />
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

export default withAuth(AdminCompanies, { adminOnly: true })
