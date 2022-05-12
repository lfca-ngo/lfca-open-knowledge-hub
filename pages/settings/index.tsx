import type { NextPage } from 'next'

import { Main, Section, SiderLayout } from '../../components/Layout'
import { NAV } from './data'

const Settings: NextPage = () => {
  return (
    <SiderLayout nav={NAV}>
      <Main>
        <Section title="Settings" titleSize="big">
          Hello
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default Settings
