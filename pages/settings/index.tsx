import { message } from 'antd'
import type { NextPage } from 'next'

import { Main, Section, SiderLayout } from '../../components/Layout'
import { Container } from '../../components/Layout/Container'
import { UserForm } from '../../components/UserForm'
import { useUserQuery } from '../../services/lfca-backend'
import { useUpdateUserMutation } from '../../services/lfca-backend'
import { UpdateUserInput } from '../../services/lfca-backend'
import { SETTINGS_NAV } from '../../utils/navs'
import { withAuth } from '../../utils/with-auth'

const Settings: NextPage = () => {
  const [{ fetching: isUpdatingUser }, updateUser] = useUpdateUserMutation()
  const [{ data, fetching: fetchingUser }] = useUserQuery()
  const user = data?.user

  const handleUpdate = (allValues: UpdateUserInput) => {
    updateUser({
      input: allValues,
    }).then(({ error }) => {
      if (error) message.error(error.message)
      else message.success('Profile updated')
    })
  }

  return (
    <SiderLayout nav={SETTINGS_NAV}>
      <Main>
        <Section title="Settings" titleSize="big">
          <Container>
            <UserForm
              filterByKeys={['email', 'firstName', 'lastName', 'picture']}
              initialValues={user}
              isLoading={fetchingUser || isUpdatingUser}
              onUpdate={handleUpdate}
            />
          </Container>
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default withAuth(Settings)
