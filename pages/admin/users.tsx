import { Button, Drawer, Form, Input, List } from 'antd'
import type { NextPage } from 'next'
import { useState } from 'react'

import { Main, Section, SiderLayout } from '../../components/Layout'
import {
  useAllUsersQuery,
  useUpdateUserMutation,
} from '../../services/lfca-backend'
import { ADMIN_NAV } from '../../utils/navs'
import { withAuth } from '../../utils/with-auth'
import { UserForm } from '../../components/UserForm'

const { Search } = Input
import { UserFragment } from '../../services/lfca-backend'

const AdminUsers: NextPage = () => {
  const [selectedUser, setSelectedUser] = useState<UserFragment>()
  const [isOpen, setIsOpen] = useState(false)

  // update user mutation
  const [{ fetching: isUpdatingUser, error, data: updatedUser }, updateUser] =
    useUpdateUserMutation()

  const [{ data: usersData, fetching: isFetchingUsers }] = useAllUsersQuery()
  const users = usersData?.users.items || []

  const handleOpen = (user: UserFragment) => {
    setIsOpen(true)
    setSelectedUser(user)
  }

  const handleUpdate = (allValues: Partial<UserFragment>) => {
    updateUser({
      input: {
        userId: selectedUser?.id,
        ...allValues,
      },
    })
  }

  return (
    <SiderLayout nav={ADMIN_NAV}>
      <Main>
        <Section title="Users" titleSize="big">
          <Search placeholder="Search by uid" />
          <List
            dataSource={users}
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
            onClose={() => setIsOpen(false)}
            visible={isOpen}
          >
            <h1>User</h1>
            <UserForm initialValues={selectedUser} onSubmit={handleUpdate} />
          </Drawer>
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default withAuth(AdminUsers, { adminOnly: true })
