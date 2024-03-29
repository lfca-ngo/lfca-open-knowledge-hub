import type { NextPage } from 'next'

import { Main, Section, SiderLayout } from '../components/Layout'
import { Container } from '../components/Layout/Container'

const Tools: NextPage = () => {
  return (
    <SiderLayout>
      <Main>
        <Section title="Tools" titleSize="big">
          <Container>
            <p>Coming soon...</p>
          </Container>
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default Tools
