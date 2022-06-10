import { PlusOutlined } from '@ant-design/icons'
import { Button, Drawer, Input, List, message, Space } from 'antd'
import _debounce from 'lodash.debounce'
import type { GetStaticProps, NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'

import { InviteUserForm } from '../../components/InviteUserForm'
import { Main, Section, SiderLayout } from '../../components/Layout'
import { UserForm } from '../../components/UserForm'
import { Country, fetchAllCountries } from '../../services/contentful'
import {
  UpdateUserInput,
  useSearchUserQuery,
  useUpdateUserMutation,
  useUsersQuery,
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
  const [uidInput, setUidInput] = useState<string>('')
  const [uidFilter, setUidFilter] = useState<string>('')
  const [nameInput, setNameInput] = useState<string>('')
  const [nameFilter, setNameFilter] = useState<string>('')
  const [cursor, setCursor] = useState<string | null>(null)
  const [cursorHistory, setCursorHistory] = useState<(string | null)[]>([])

  const debouncedUidFilter = useRef(
    _debounce(async (value) => {
      setUidFilter(value)
    }, 500)
  ).current

  const debouncedNameFilter = useRef(
    _debounce(async (value) => {
      setNameFilter(value)
    }, 500)
  ).current

  useEffect(() => {
    debouncedUidFilter(uidInput)
  }, [debouncedUidFilter, uidInput])

  useEffect(() => {
    debouncedNameFilter(nameInput)
  }, [debouncedNameFilter, nameInput])

  const [{ fetching: isUpdatingUser }, updateUser] = useUpdateUserMutation()

  const [{ data: usersData, fetching: isFetchingUsers }] = useUsersQuery({
    pause: !!nameFilter,
    variables: {
      input: {
        cursor,
        filter: {
          userIds: uidFilter ? [uidFilter] : undefined,
        },
      },
    },
  })

  const [{ data: searchData, fetching: isFetchingSearch }] = useSearchUserQuery(
    {
      pause: !nameFilter,
      variables: {
        input: {
          query: nameFilter,
        },
      },
    }
  )

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
            <Search
              allowClear
              onChange={(e) => {
                setUidInput(e.target.value)
                setNameInput('')
              }}
              placeholder="Search by uid"
              value={uidInput}
            />
            or
            <Search
              allowClear
              onChange={(e) => {
                setNameInput(e.target.value)
                setUidInput('')
              }}
              placeholder="Search by name"
              value={nameInput}
            />
          </Space>
          <List
            dataSource={
              nameFilter
                ? searchData?.searchUser || []
                : usersData?.users.items || []
            }
            loading={isFetchingUsers || isFetchingSearch}
            renderItem={(user) => (
              <List.Item
                actions={[
                  <Button key="edit" onClick={() => handleOpen(user)}>
                    Edit
                  </Button>,
                ]}
              >
                {user.firstName} {user.lastName}
              </List.Item>
            )}
          />
          <div style={{ textAlign: 'center' }}>
            {!nameFilter && cursorHistory.length ? (
              <>
                {' '}
                <Button
                  onClick={() => {
                    const [prevCursor, ...remainingHistory] = cursorHistory
                    setCursorHistory(remainingHistory)
                    setCursor(prevCursor)
                  }}
                  type="text"
                >
                  {'< Previous'}
                </Button>{' '}
              </>
            ) : null}

            {!nameFilter && usersData?.users.cursor ? (
              <Button
                onClick={() => {
                  setCursorHistory((v) => [cursor, ...v])
                  setCursor(usersData.users.cursor ?? null)
                }}
                type="text"
              >
                {'Next >'}
              </Button>
            ) : null}
          </div>

          <Drawer
            className="drawer-md"
            destroyOnClose
            onClose={() => setIsOpen(false)}
            visible={isOpen}
          >
            {selectedUser ? (
              <>
                <h1>Update User</h1>
                <UserForm
                  countries={countries}
                  initialValues={selectedUser}
                  isLoading={isUpdatingUser}
                  onUpdate={handleUpdate}
                  type={'update'}
                />
              </>
            ) : (
              <>
                <h1>Create User Invite</h1>
                <InviteUserForm />
              </>
            )}
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
