import type { NextPage, GetStaticProps } from 'next'
import { Button, Tabs, List } from 'antd'
import { SiderLayout } from '../components/Layout'
import { fetchAllActions } from '../services/contentful'
import { ActionCard } from '../components/ActionCard'

const { TabPane } = Tabs


const Home: NextPage = (props: any) => {
  return (
    <SiderLayout breadcrumbs={[{ text: 'Home', link: '/admin' }]}>
      <h1>Hi Anna, take the next step</h1>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='All Actions' key='1'>
          <List dataSource={props.actions} renderItem={(item: any) => {
            return (
              <List.Item>
                <ActionCard action={item} />
              </List.Item>
            )
          }
          } />
        </TabPane>
        <TabPane tab='Ecommerce' key='2'>
          Space
        </TabPane>
        <TabPane tab='Tech' key='3'>
          Space
        </TabPane>
      </Tabs>

    </SiderLayout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const actions = await fetchAllActions()

  return {
    props: {
      actions: actions
    }
  }
}

export default Home
