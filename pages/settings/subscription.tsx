import type { GetStaticProps, NextPage } from 'next'

import { Main, Section, SiderLayout } from '../../components/Layout'
import { Container } from '../../components/Layout/Container'
import { SubscriptionSelector } from '../../components/SubscriptionSelector'
import { Subscription } from '../../services/contentful'
import { fetchAllSubscriptions } from '../../services/contentful'
import { withAuth } from '../../utils/with-auth'

const SubscriptionPage: NextPage = ({
  subscriptions,
}: {
  subscriptions?: Subscription[]
}) => {
  return (
    <SiderLayout>
      <Main>
        <Section title="Your membership" titleSize="big">
          <Container type="lg">
            <SubscriptionSelector subscriptions={subscriptions} />
          </Container>
        </Section>
      </Main>
    </SiderLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const subscriptions = await fetchAllSubscriptions()

  return {
    props: {
      subscriptions,
    },
  }
}

export default withAuth(SubscriptionPage)
