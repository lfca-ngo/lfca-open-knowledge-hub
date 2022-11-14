import type { NextPage } from 'next'

import { InviteTeam } from '../../components/InviteTeam'
import { Main, Section, SiderLayout } from '../../components/Layout'
import { Container } from '../../components/Layout/Container'
import { SETTINGS_NAV } from '../../utils/navs'
import { withAuth } from '../../utils-server-only'

const Invite: NextPage = () => {
  return (
    <SiderLayout nav={SETTINGS_NAV}>
      <Main>
        <Section title="Invite" titleSize="big">
          <Container>
            <InviteTeam />
          </Container>
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default withAuth(Invite)
