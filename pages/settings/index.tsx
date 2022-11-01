import type { NextPage } from 'next'

import { Main, Section, SiderLayout } from '../../components/Layout'
import { Container } from '../../components/Layout/Container'
import { UserForm } from '../../components/UserForm'
import { useUserQuery } from '../../services/lfca-backend'
import { SETTINGS_NAV } from '../../utils/navs'
import { withAuth } from '../../utils/with-auth'

const Settings: NextPage = () => {
  const [{ data, fetching: fetchingUser }] = useUserQuery()
  const user = data?.user

  return (
    <SiderLayout nav={SETTINGS_NAV}>
      <Main>
        <Section title="Settings" titleSize="big">
          <Container>
            <UserForm
              filterByKeys={[
                'email',
                'firstName',
                'lastName',
                'jobRole',
                'picture',
              ]}
              initialValues={user}
              isLoadingInitialValues={fetchingUser}
            />
          </Container>
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default withAuth(Settings)
