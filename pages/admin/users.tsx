import { Button, Drawer, Form, Input, List } from 'antd'
import type { NextPage } from 'next'
import { useState } from 'react'

import { Main, Section, SiderLayout } from '../../components/Layout'
import { ADMIN_NAV } from '../../utils/navs'

const { Search } = Input

const FAKE_USERS = [
  {
    createdAt: '2020-01-01',
    email: 'john@doe.de',
    id: '1',
    name: 'John Doe',
    updatedAt: '2020-01-01',
  },
  {
    createdAt: '2020-01-01',
    email: 'john@doe.de',
    id: '2',
    name: 'Peter Doe',
    updatedAt: '2020-01-01',
  },
  {
    createdAt: '2020-01-01',
    email: 'heinz@doe.de',
    id: '2',
    name: 'Peter Heinz',
    updatedAt: '2020-01-01',
  },
]

const AdminUsers: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const updateUser = () => {
    // TODO: update user
  }

  return (
    <SiderLayout nav={ADMIN_NAV}>
      <Main>
        <Section title="Users" titleSize="big">
          <Search placeholder="Search by uid" />
          <List
            dataSource={FAKE_USERS}
            renderItem={(user: any) => (
              <List.Item
                actions={[
                  <Button key="edit" onClick={() => setIsOpen(true)}>
                    Edit
                  </Button>,
                ]}
              >
                {user.name}
              </List.Item>
            )}
          />

          <Drawer onClose={() => setIsOpen(false)} visible={isOpen}>
            <h1>User</h1>
            <Form layout="vertical" onFinish={updateUser}>
              <Form.Item label="Name">
                <Input />
              </Form.Item>
              <Form.Item label="Email">
                <Input />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" type="primary">
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Drawer>
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default AdminUsers
