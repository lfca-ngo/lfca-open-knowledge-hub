import type { NextPage } from 'next'

import { Main, Section, SiderLayout } from '../../components/Layout'
import { NAV } from './data'

const PlannedActions: NextPage = () => {
  return (
    <SiderLayout nav={NAV}>
      <Main>
        <Section title="Planned Actions" titleSize="big">
          Planned Actions
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default PlannedActions
