import type { NextPage } from 'next'

import { Main, Section, SiderLayout } from '../../components/Layout'
import { Container } from '../../components/Layout/Container'
import { ShareImage } from '../../tools/ShareImage'
import { withAuth } from '../../utils/with-auth'

const ReferralProgram: NextPage = () => {
  return (
    <SiderLayout>
      <Main>
        <Section title="Invite your network" titleSize="big">
          <Container>
            <p>
              Did you know? LFCA has grown entirely by word of mouth. As a
              non-profit organization we rely on our community to spread the
              word. Inviting other people and their companies to take action is
              one of the most impactful things that you can do as an individual.
            </p>
            <p>
              Share your personal invite on LinkedIn or any other social
              network:
            </p>
            <ShareImage />
          </Container>
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default withAuth(ReferralProgram)
