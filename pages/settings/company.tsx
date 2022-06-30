import { message } from 'antd'
import type { NextPage } from 'next'

import { CompanyForm } from '../../components/CompanyForm'
import { Main, Section, SiderLayout } from '../../components/Layout'
import { Container } from '../../components/Layout/Container'
import {
  UpdateCompanyInput,
  useCompanyQuery,
  useUpdateCompanyMutation,
} from '../../services/lfca-backend'
import { SETTINGS_NAV } from '../../utils/navs'
import { withAuth } from '../../utils/with-auth'

const CompanySettings: NextPage = () => {
  const [{ fetching: isUpdatingCompany }, updateCompany] =
    useUpdateCompanyMutation()
  const [{ data, fetching: fetchingCompany }] = useCompanyQuery()
  const company = data?.company

  const handleUpdate = (allValues: UpdateCompanyInput) => {
    updateCompany({
      input: {
        ...allValues,
      },
    }).then(({ error }) => {
      if (error) message.error(error.message)
      else message.success('Profile updated')
    })
  }

  return (
    <SiderLayout nav={SETTINGS_NAV}>
      <Main>
        <Section title="Company" titleSize="big">
          <Container>
            <CompanyForm
              filterByKeys={['logoUrl', 'websiteUrl']}
              initialValues={company}
              isLoading={fetchingCompany || isUpdatingCompany}
              onUpdate={handleUpdate}
              type="update"
            />
          </Container>
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default withAuth(CompanySettings)
