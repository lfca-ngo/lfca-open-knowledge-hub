import type { NextPage } from 'next'

import { Main, Section, SiderLayout } from '../../components/Layout'
import { Container } from '../../components/Layout/Container'
import { ShareImage } from '../../tools/ShareImage'
import { withAuth } from '../../utils/with-auth'

const ReferralProgram: NextPage = () => {
  return (
    <SiderLayout>
      <Main>
        <Section title="Refer a friend" titleSize="big">
          <Container>
            <ShareImage />
          </Container>
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default withAuth(ReferralProgram)
