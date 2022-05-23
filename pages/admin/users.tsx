import { PlusOutlined } from '@ant-design/icons'
import { Button, Drawer, Input, List, message, Space } from 'antd'
import type { GetStaticProps, NextPage } from 'next'
import { useState } from 'react'

import { Main, Section, SiderLayout } from '../../components/Layout'
import { UserForm } from '../../components/UserForm'
import { Country, fetchAllCountries } from '../../services/contentful'
import {
  CreateUserInput,
  UpdateUserInput,
  useAllUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} from '../../services/lfca-backend'
import { ADMIN_NAV } from '../../utils/navs'
import { withAuth } from '../../utils/with-auth'

const { Search } = Input
import { UserFragment } from '../../services/lfca-backend'

interface AdminUsersProps {
  countries: Country[]
}

const AdminUsers: NextPage<AdminUsersProps> = ({ countries }) => {
  const [selectedUser, setSelectedUser] = useState<UserFragment | undefined>()
  const [isOpen, setIsOpen] = useState(false)

  const [{ fetching: isUpdatingUser }, updateUser] = useUpdateUserMutation()
  const [{ fetching: isCreatingUser }, createUser] = useCreateUserMutation()
  const [{ data: usersData, fetching: isFetchingUsers }] = useAllUsersQuery()

  const users = usersData?.users.items || []

  const handleOpen = (user?: UserFragment) => {
    setIsOpen(true)
    setSelectedUser(user)
  }

  const handleUpdate = (allValues: UpdateUserInput) => {
    updateUser({
      input: {
        userId: selectedUser?.id,
        ...allValues,
      },
    }).then(({ error }) => {
      if (error) message.error(error.message)
      else message.success('User updated')
    })
  }

  const handleCreate = (allValues: CreateUserInput) => {
    createUser({
      input: {
        ...allValues,
      },
    }).then(({ error }) => {
      if (error) message.error(error.message)
      else message.success('User created')
    })
  }

  return (
    <SiderLayout nav={ADMIN_NAV}>
      <Main>
        <Section title="Users" titleSize="big">
          <Space>
            <Button
              icon={<PlusOutlined />}
              onClick={() => handleOpen()}
              type="primary"
            >
              Create new user
            </Button>
            <Search placeholder="Search by uid" />
          </Space>

          <List
            dataSource={users}
            loading={isFetchingUsers}
            renderItem={(user) => (
              <List.Item
                actions={[
                  <Button key="edit" onClick={() => handleOpen(user)}>
                    Edit
                  </Button>,
                ]}
              >
                {user.firstName}
              </List.Item>
            )}
          />
          <Drawer
            className="drawer-md"
            destroyOnClose
            onClose={() => setIsOpen(false)}
            visible={isOpen}
          >
            <h1>{`${selectedUser ? 'Update' : 'Create'} User`}</h1>
            <UserForm
              countries={countries}
              initialValues={selectedUser}
              isLoading={isUpdatingUser || isCreatingUser}
              onCreate={handleCreate}
              onUpdate={handleUpdate}
              type={selectedUser ? 'update' : 'create'}
            />
          </Drawer>
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
