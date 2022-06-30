import type { GetStaticProps, NextPage } from 'next'

import { AdminCompaniesList } from '../../components/AdminCompaniesList'
import { Main, Section, SiderLayout } from '../../components/Layout'
import {
  Country,
  fetchAllCountries,
  fetchAllPrograms,
  Program,
} from '../../services/contentful'
import { ADMIN_NAV } from '../../utils/navs'
import { withAuth } from '../../utils/with-auth'

interface AdminCompaniesProps {
  countries: Country[]
  programs: Program[]
}

const AdminCompanies: NextPage<AdminCompaniesProps> = ({
  countries,
  programs,
}) => {
  return (
    <SiderLayout nav={ADMIN_NAV}>
      <Main>
        <Section title="Companies" titleSize="big">
          <AdminCompaniesList countries={countries} programs={programs} />
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

export default withAuth(AdminCompanies, { adminOnly: true })
