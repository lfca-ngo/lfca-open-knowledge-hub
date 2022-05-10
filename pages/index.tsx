import { List, Tabs } from 'antd'
import type { GetStaticProps, NextPage } from 'next'

import { ActionCard } from '../components/ActionCard'
import Logout from '../components/Auth/Logout'
import { SiderLayout, Main, Section, Sider } from '../components/Layout'
import { fetchAllActions } from '../services/contentful'
import { ALL_ACTIONS } from '../services/contentful/fetch-all-actions'
import { useUserQuery } from '../services/lfca-backend'

const { TabPane } = Tabs

const Home: NextPage = (props: any) => {
  const [{ data }] = useUserQuery()

  const { byTags } = props.actions
  return (
    <SiderLayout>
      <Main>
        <Section title='Dashboard' titleSize='big'>
          <Tabs defaultActiveKey={ALL_ACTIONS}>
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
          <Logout />
        </Section>
      </Main>
      <Sider>
        <Section>
          <Section title='Rewards'>
            Something
          </Section>
        </Section>
      </Sider>

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
