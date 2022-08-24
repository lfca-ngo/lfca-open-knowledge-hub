import type { NextPage } from 'next'

import { Main, Section, SiderLayout } from '../../components/Layout'
import { Container } from '../../components/Layout/Container'
import { withAuth } from '../../utils/with-auth'

const Community: NextPage = () => {
  return (
    <SiderLayout>
      <Main>
        <Section title="Community" titleSize="big">
          <Container>
            <p>Coming soon...</p>
          </Container>
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default withAuth(Community)
