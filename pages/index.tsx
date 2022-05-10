
import type { GetStaticProps, NextPage } from 'next'

import Logout from '../components/Auth/Logout'
import { SiderLayout, Main, Section, Sider } from '../components/Layout'
import { ActionsList } from '../components/ActionsList'
import { fetchAllActions } from '../services/contentful'

const Home: NextPage = (props: any) => {
  const { byTags } = props.actions
  return (
    <SiderLayout>
      <Main>
        <Section title='Dashboard' titleSize='big'>
          <ActionsList actionsByTags={byTags} />
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
