import type { NextPage } from 'next'

import { Main, Section, SiderLayout } from '../../components/Layout'
import { NAV } from './data'

const Invite: NextPage = () => {
  return (
    <SiderLayout nav={NAV}>
      <Main>
        <Section title="Invite" titleSize="big">
          Hello
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default Invite
