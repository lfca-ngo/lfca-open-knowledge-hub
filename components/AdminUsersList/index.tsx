import { DownloadOutlined, PlusOutlined } from '@ant-design/icons'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { Button, Drawer, Form, Input, message, Space, Table } from 'antd'
import _debounce from 'lodash.debounce'
import { useRef, useState } from 'react'

import { InviteUserForm } from '../../components/InviteUserForm'
import { UserForm } from '../../components/UserForm'
import { Country, Program } from '../../services/contentful'
import {
  useCreateUserExportMutation,
  useSearchUserQuery,
  useUsersQuery,
} from '../../services/lfca-backend'
import { UserFragment } from '../../services/lfca-backend'
import styles from './styles.module.less'

interface AdminUsersListProps {
  countries: Country[]
  programs: Program[]
}

const { Column } = Table
const { Search } = Input

export const AdminUsersList = ({
  countries,
  programs,
}: AdminUsersListProps) => {
  const [selectedUser, setSelectedUser] = useState<UserFragment | undefined>()
  const [isOpen, setIsOpen] = useState(false)
  const [form] = Form.useForm()

  // Debounced search filters
  const [uidFilter, setUidFilter] = useState<string>('')
  const [nameFilter, setNameFilter] = useState<string>('')

  // cursors for pagination
  const [cursor, setCursor] = useState<string | null>(null)
  const [cursorHistory, setCursorHistory] = useState<(string | null)[]>([])

  const debouncedUidFilter = useRef(
    _debounce(async (value) => {
      setNameFilter('')
      setCursor(null)
      setUidFilter(value)
    }, 500)
  ).current

  const debouncedNameFilter = useRef(
    _debounce(async (value) => {
      setUidFilter('')
      setCursor(null)
      setNameFilter(value)
    }, 500)
  ).current

  const [{ fetching: isExporting }, exportUsers] = useCreateUserExportMutation()

  const [{ data: usersData, fetching: isFetchingUsers }] = useUsersQuery({
    pause: !!nameFilter,
    variables: {
      input: {
        cursor,
        filter: {
          includeDeleted: true,
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

  // the first argument is the last changed value, other values are undefined
  const handleValuesChange = ({ name, uid }: { uid: string; name: string }) => {
    if (name !== undefined) {
      form.setFieldsValue({ uid: '' })
      debouncedNameFilter(name)
    }
    if (uid !== undefined) {
      form.setFieldsValue({ name: '' })
      debouncedUidFilter(uid)
    }
  }

  const handleOpen = (user?: UserFragment) => {
    setIsOpen(true)
    setSelectedUser(user)
  }

  const handleClose = () => {
    setIsOpen(false)
    setSelectedUser(undefined)
  }

  const handleExport = () => {
    exportUsers({}).then(({ data, error }) => {
      if (error) message.error(error.message)
      const url = data?.createUserExport
      if (url) {
        window.location.assign(url)
      }
    })
  }

  return (
    <div className="admin-users-list">
      <Space>
        <Button
          icon={<PlusOutlined />}
          onClick={() => handleOpen()}
          type="primary"
        >
          Create new user
        </Button>

        <Form
          className="search-form"
          form={form}
          layout="inline"
          onValuesChange={handleValuesChange}
        >
          <Form.Item name="uid">
            <Search allowClear placeholder="Search by uid" />
          </Form.Item>
          <div className="divider">or</div>
          <Form.Item name="name">
            <Search allowClear placeholder="Search by email/name" />
          </Form.Item>
        </Form>

        <Button
          icon={<DownloadOutlined />}
          loading={isExporting}
          onClick={() => handleExport()}
          type="ghost"
        >
          Export
        </Button>
      </Space>

      <Table
        className="users-table"
        dataSource={
          nameFilter
            ? searchData?.searchUser || []
            : usersData?.users.items || []
        }
        loading={isFetchingUsers || isFetchingSearch}
        pagination={false}
        rowClassName={(item) => (item.deletedAt ? 'row-deleted' : 'undefined')}
        rowKey={(item) => item.id}
      >
        <Column dataIndex="firstName" key="firstName" title="First name" />
        <Column dataIndex="lastName" key="lastName" title="Last name" />
        <Column dataIndex="id" key="id" title="Id" />
        <Column
          key="action"
          render={(_, record: UserFragment) =>
            !record.deletedAt ? (
              <Space size="middle">
                <Button onClick={() => handleOpen(record)} type="primary">
                  Edit
                </Button>
              </Space>
            ) : (
              'Deleted'
            )
          }
          title="Action"
        />
      </Table>

      <Space>
        {!nameFilter && cursorHistory.length ? (
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => {
              const [prevCursor, ...remainingHistory] = cursorHistory
              setCursorHistory(remainingHistory)
              setCursor(prevCursor)
            }}
            type="text"
          />
        ) : null}

        {!nameFilter && usersData?.users.cursor ? (
          <Button
            icon={<ArrowRightOutlined />}
            onClick={() => {
              setCursorHistory((v) => [cursor, ...v])
              setCursor(usersData.users.cursor ?? null)
            }}
            type="text"
          />
        ) : null}
      </Space>

      <Drawer
        className="drawer-md"
        destroyOnClose
        onClose={handleClose}
        visible={isOpen}
      >
        {selectedUser ? (
          <>
            <h1>Update User</h1>
            <UserForm
              countries={countries}
              initialValues={selectedUser}
              onDeleted={() => handleClose()}
              programs={programs}
            />
          </>
        ) : (
          <>
            <h1>Create User Invite</h1>
            <InviteUserForm />
          </>
        )}
      </Drawer>
    </div>
  )
}
