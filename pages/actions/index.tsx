import type { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'

import { ActionsCarousel } from '../../components/ActionsCarousel'
import { ActionsList } from '../../components/ActionsList'
import { Main, Section, Sider, SiderLayout } from '../../components/Layout'
import { fetchAllActions } from '../../services/contentful'
import { ACTIONS_NAV } from '../../utils/navs'

const Home: NextPage = (props: any) => {
  const router = useRouter()
  const { byTags } = props.actions
  const highlightedActions = byTags['Tech'] // @TODO: replace with recommended, required, expired

  const handleActionClick = (actionId: string) => {
    router.push(`/action/${actionId}`)
  }

  return (
    <SiderLayout nav={ACTIONS_NAV}>
      <Main>
        <Section className="mb-40" title="Dashboard" titleSize="big">
          <ActionsCarousel
            actions={highlightedActions}
            onSelect={handleActionClick}
          />
        </Section>
        <Section bordered={false} title="Browse all actions">
          <ActionsList actionsByTags={byTags} onSelect={handleActionClick} />
        </Section>
      </Main>
      <Sider>
        <Section title="Rewards">Something</Section>
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
