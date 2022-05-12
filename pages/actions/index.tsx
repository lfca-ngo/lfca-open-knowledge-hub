
import type { GetStaticProps, NextPage } from 'next'

import Logout from '../../components/Auth/Logout'
import { SiderLayout, Main, Section, Sider } from '../../components/Layout'
import { ActionsList } from '../../components/ActionsList'
import { ActionsCarousel } from '../../components/ActionsCarousel'
import { fetchAllActions } from '../../services/contentful'
import { NAV } from './data'


const Home: NextPage = (props: any) => {
  const { byTags } = props.actions
  const highlightedActions = byTags['Tech'] // @TODO: replace with recommended, required, expired

  return (
    <SiderLayout nav={NAV}>
      <Main>
        <Section title='Dashboard' titleSize='big'>
          <ActionsCarousel actions={highlightedActions} />
        </Section>
        <Section title='Browse all actions' bordered={false} >
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
