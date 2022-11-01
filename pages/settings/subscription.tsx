import type { NextPage } from 'next'

import { Main, Section, SiderLayout } from '../../components/Layout'
import { Container } from '../../components/Layout/Container'
import { SubscriptionSelector } from '../../components/SubscriptionSelector'
import { withAuth } from '../../utils/with-auth'

const SubscriptionPage: NextPage = () => {
  return (
    <SiderLayout>
      <Main>
        <Section title="Your membership" titleSize="big">
          <Container size="lg">
            <SubscriptionSelector />
          </Container>
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default withAuth(SubscriptionPage)
