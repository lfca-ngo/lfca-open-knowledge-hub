import type { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { Button, Tabs } from 'antd'
import { SiderLayout } from '../../components/Layout'
import { fetchAllActions } from '../../services/contentful'

const { TabPane } = Tabs

const Action: NextPage = (props: any) => {
    const action = props.action
    console.log(action)
    return (
        <SiderLayout breadcrumbs={[{ text: 'Home', link: '/admin' }]}>
            <h1>{action?.title}</h1>
            <Button type='primary'>Hallo</Button>
            <Tabs defaultActiveKey='1'>
                <TabPane tab='All Actions' key='1'>
                    Hallo
                </TabPane>
            </Tabs>

        </SiderLayout>
    )
}


export const getStaticProps: GetStaticProps = async ({ params }) => {
    const actionId: any = params?.actionId
    const actions: any = await fetchAllActions()
    const action = actions.find((action: any) => action.actionId === actionId)

    return {
        props: {
            action
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const actions = await fetchAllActions()
    const paths = actions.map((action: any) => ({ params: { actionId: action.actionId } }))
    return {
        paths: paths,
        fallback: false
    }
}

export default Action
