import type { NextPage, GetStaticProps } from 'next'
import Link from 'next/link'
import { Button, Tabs, List } from 'antd'
import { SiderLayout } from '../components/Layout'
import { fetchAllActions } from '../services/contentful'

const { TabPane } = Tabs

const Home: NextPage = (props: any) => {
  console.log(props)
  return (
    <SiderLayout breadcrumbs={[{ text: 'Home', link: '/admin' }]}>
      <h1>Hi Anna, take the next step</h1>
      <Button type='primary'>Hallo</Button>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='All Actions' key='1'>
          <List dataSource={props.actions} renderItem={(item: any) => {
            return (
              <List.Item>
                <Link href={`/action/${item.actionId}`}>
                  {item.title}
                </Link>

              </List.Item>
            )
          }
          } />
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
