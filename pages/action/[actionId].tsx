import type { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { Button, Tabs, Row, Col, Space, Drawer, Form, Upload, Input } from 'antd'
import { SiderLayout } from '../../components/Layout'
import { fetchAllActions } from '../../services/contentful'
import { CheckOutlined, CalendarOutlined, UploadOutlined } from '@ant-design/icons'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { ALL_ACTIONS } from '../../services/contentful'

const { TabPane } = Tabs
const { TextArea } = Input

const Main = ({ children }: { children: any }) => (
    <Col xs={24} md={16}>
        {children}
    </Col>

)

const Sider = ({ children }: { children: any }) => (
    <Col xs={24} md={{ span: 6, offset: 2 }}>
        {children}
    </Col>

)

const Section = ({ children, title }: { children: any, title?: any }) => (
    <Row>
        <Col xs={24} className='page-section'>
            {title && <h2 className='title'>{title}</h2>}
            {children}
        </Col>
    </Row>
)

const Action: NextPage = (props: any) => {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const action = props.action
    return (
        <SiderLayout goBack={() => router.back()} breadcrumbs={[{ text: 'Home', link: '/admin' }]}>
            <Row>
                <Main>
                    <Section>
                        <h1>{action?.title}</h1>
                    </Section>
                    <Section>
                        <Tabs defaultActiveKey='1'>
                            <TabPane tab='Description' key='1'>
                                {documentToReactComponents(action?.aboutText)}
                            </TabPane>
                            <TabPane tab='Benefits' key='2'>
                                {documentToReactComponents(action?.benefits)}
                            </TabPane>
                        </Tabs>
                    </Section>
                    <Section title='Find the right tool'>
                        Something
                    </Section>
                </Main>

                <Sider>
                    <Section title='Your progress'>
                        <Space direction='vertical'>
                            <Button size='large' onClick={() => setIsOpen(true)} block icon={<CheckOutlined />} type='primary'>Mark as done</Button>
                            <Button size='large' block icon={<CalendarOutlined />} ghost>Mark as planned</Button>
                        </Space>
                    </Section>
                    <Section title='Community'>
                        Something
                    </Section>
                    <Section title='Attachments'>
                        Something
                    </Section>
                </Sider>
            </Row>
            <Drawer visible={isOpen} onClose={() => setIsOpen(false)}>
                <h1>Share learnings</h1>
                <Form layout='vertical'>
                    <Form.Item label='Any learnings to share?'>
                        <TextArea rows={10} placeholder='We created an overview of 10 banks and evaluated them based on x,y,z...' />
                    </Form.Item>
                    <Form.Item label='Attachments'>
                        <Upload>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button size='large' type='primary' htmlType='submit'>Submit</Button>
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
            action
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const { byTags } = await fetchAllActions()
    const paths = byTags[ALL_ACTIONS].map((action: any) => ({ params: { actionId: action.actionId } }))
    return {
        paths: paths,
        fallback: false
    }
}

export default Action
