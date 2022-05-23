import type { NextPage } from 'next'

import { InviteTeam } from '../../components/InviteTeam'
import { Main, Section, SiderLayout } from '../../components/Layout'
import { SETTINGS_NAV } from '../../utils/navs'
import { withAuth } from '../../utils/with-auth'

const Invite: NextPage = () => {
  return (
    <SiderLayout nav={SETTINGS_NAV}>
      <Main>
        <Section title="Invite" titleSize="big">
          <InviteTeam />
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default withAuth(Invite)
