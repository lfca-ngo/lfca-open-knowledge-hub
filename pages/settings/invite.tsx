import type { NextPage } from 'next'

import { Main, Section, SiderLayout } from '../../components/Layout'
import { withAuth } from '../../services/firebase'
import { SETTINGS_NAV } from '../../utils/navs'

const Invite: NextPage = () => {
  return (
    <SiderLayout nav={SETTINGS_NAV}>
      <Main>
        <Section title="Invite" titleSize="big">
          Hello
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default withAuth(Invite)
