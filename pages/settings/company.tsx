import type { NextPage } from 'next'

import { CompanyForm } from '../../components/CompanyForm'
import { Main, Section, SiderLayout } from '../../components/Layout'
import { Container } from '../../components/Layout/Container'
import { useCompanyQuery } from '../../services/lfca-backend'
import { SETTINGS_NAV } from '../../utils/navs'
import { withAuth } from '../../utils/with-auth'

const CompanySettings: NextPage = () => {
  const [{ data, fetching: fetchingCompany }] = useCompanyQuery()
  const company = data?.company

  return (
    <SiderLayout nav={SETTINGS_NAV}>
      <Main>
        <Section title="Company" titleSize="big">
          <Container>
            <CompanyForm
              filterByKeys={[
                'logoUrl',
                'websiteUrl',
                'companyTags',
                'employeeCount',
              ]}
              initialValues={company}
              isLoadingInitialValues={fetchingCompany}
              type="update"
            />
          </Container>
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default withAuth(CompanySettings)
