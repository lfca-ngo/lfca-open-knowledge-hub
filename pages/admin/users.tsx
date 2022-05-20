import { PlusOutlined } from '@ant-design/icons'
import { Button, Drawer, Input, List, message } from 'antd'
import type { NextPage } from 'next'
import { useState } from 'react'

import { Main, Section, SiderLayout } from '../../components/Layout'
import { UserForm } from '../../components/UserForm'
import {
  useAllUsersQuery,
  useUpdateUserMutation,
} from '../../services/lfca-backend'
import { ADMIN_NAV } from '../../utils/navs'
import { withAuth } from '../../utils/with-auth'

const { Search } = Input
import { UserFragment } from '../../services/lfca-backend'

const AdminUsers: NextPage = () => {
  const [selectedUser, setSelectedUser] = useState<UserFragment | undefined>()
  const [isOpen, setIsOpen] = useState(false)

  const [{ fetching: isUpdatingUser }, updateUser] = useUpdateUserMutation()
  const [{ data: usersData, fetching: isFetchingUsers }] = useAllUsersQuery()
  const users = usersData?.users.items || []

  const handleOpen = (user?: UserFragment) => {
    setIsOpen(true)
    setSelectedUser(user)
  }

  const handleUpdate = (allValues: Partial<UserFragment>) => {
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

  const handleCreate = (allValues: Partial<UserFragment>) => {
    console.log('create user', allValues)
  }

  const handleSubmit = (allValues: Partial<UserFragment>) => {
    if (selectedUser) {
      handleUpdate(allValues)
    } else {
      handleCreate(allValues)
    }
  }

  return (
    <SiderLayout nav={ADMIN_NAV}>
      <Main>
        <Section title="Users" titleSize="big">
          <Button
            icon={<PlusOutlined />}
            onClick={() => handleOpen()}
            type="primary"
          >
            Create new user
          </Button>
          <Search placeholder="Search by uid" />

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
            <h1>User</h1>
            <UserForm
              initialValues={selectedUser}
              isLoading={isUpdatingUser}
              onSubmit={handleSubmit}
            />
          </Drawer>
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default withAuth(AdminUsers, { adminOnly: true })
