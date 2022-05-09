import { List, Tabs } from 'antd'
import type { GetStaticProps, NextPage } from 'next'

import { ActionCard } from '../components/ActionCard'
import { SiderLayout } from '../components/Layout'
import { fetchAllActions } from '../services/contentful'
import { ALL_ACTIONS } from '../services/contentful/fetch-all-actions'

const { TabPane } = Tabs

const Home: NextPage = (props: any) => {
  const { byTags } = props.actions
  return (
    <SiderLayout>
      <h1 style={{ margin: '20px 0 20px' }}>Hi Anna, take the next step</h1>
      <Tabs className="tabs-full-width" defaultActiveKey={ALL_ACTIONS}>
        {Object.keys(byTags).map((tag: string) => {
          const actions = byTags[tag]
          return (
            <TabPane key={tag} tab={tag}>
              <List
                className="actions-list"
                dataSource={actions}
                pagination={{ pageSize: 10 }}
                renderItem={(item: any) => {
                  return (
                    <List.Item>
                      <ActionCard action={item} />
                    </List.Item>
                  )
                }}
              />
            </TabPane>
          )
        })}
      </Tabs>
    </SiderLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const actions = await fetchAllActions()

  return {
    props: {
      actions,
    },
  }
}

export default Home
