import {
  CalendarOutlined,
  CheckOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import {
  Button,
  Drawer,
  Form,
  Input,
  Row,
  Space,
  Tabs,
  Upload,
} from 'antd'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { ActionDetails } from '../../components/ActionDetails'
import { SiderLayout, Main, Section, Sider } from '../../components/Layout'
import { fetchAllActions } from '../../services/contentful'
import { ALL_ACTIONS } from '../../services/contentful'

const { TabPane } = Tabs
const { TextArea } = Input

const Action: NextPage = (props: any) => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const action = props.action
  return (
    <SiderLayout goBack={() => router.back()}>
      <Main>
        <Section>
          <ActionDetails action={action} />
        </Section>
        <Section>
          <Tabs defaultActiveKey="1">
            <TabPane key="1" tab="Description">
              {documentToReactComponents(action?.aboutText)}
            </TabPane>
            <TabPane key="2" tab="Benefits">
              {documentToReactComponents(action?.benefits)}
            </TabPane>
          </Tabs>
        </Section>
        <Section title="Find the right tool">Something</Section>
      </Main>

      <Sider>
        <Section title="Your progress">
          <Space direction="vertical" style={{ width: '100%' }}>
            <Button
              block
              icon={<CheckOutlined />}
              onClick={() => setIsOpen(true)}
              size="large"
              type="primary"
            >
              Mark as done
            </Button>
            <Button block ghost icon={<CalendarOutlined />} size="large">
              Mark as planned
            </Button>
          </Space>
        </Section>
        <Section title="Community">Something</Section>
        <Section title="Attachments">Something</Section>
      </Sider>

      <Drawer onClose={() => setIsOpen(false)} visible={isOpen}>
        <h1>Share learnings</h1>
        <Form layout="vertical">
          <Form.Item label="Any learnings to share?">
            <TextArea
              placeholder="We created an overview of 10 banks and evaluated them based on x,y,z..."
              rows={10}
            />
          </Form.Item>
          <Form.Item label="Attachments">
            <Upload>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" size="large" type="primary">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </SiderLayout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const actionId: any = params?.actionId
  const actions: any = await fetchAllActions()
  const action = actions.byId[actionId]

  return {
    props: {
      action,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { byTags } = await fetchAllActions()
  const paths = byTags[ALL_ACTIONS].map((action: any) => ({
    params: { actionId: action.actionId },
  }))
  return {
    fallback: false,
    paths: paths,
  }
}

export default Action
