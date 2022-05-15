import { Button, Form, Input } from 'antd'
import type { NextPage } from 'next'

import { DarkModeSelector } from '../../components/DarkModeSelector'
import { FileUpload } from '../../components/FileUpload/FileUpload'
import { Main, Section, SiderLayout } from '../../components/Layout'
import { SETTINGS_NAV } from '../../utils/navs'

const Settings: NextPage = () => {
  const updateProfile = () => {
    // @TODO: update profile
  }

  return (
    <SiderLayout nav={SETTINGS_NAV}>
      <Main>
        <Section title="Settings" titleSize="big">
          <Form layout="vertical" onFinish={updateProfile}>
            <Form.Item label="Name" name="name">
              <Input placeholder="Your name" />
            </Form.Item>
            <Form.Item label="Change picture" name="picture">
              <FileUpload />
            </Form.Item>
            <Form.Item label="Darkmode">
              <DarkModeSelector />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                Save
              </Button>
            </Form.Item>
          </Form>
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default Settings
