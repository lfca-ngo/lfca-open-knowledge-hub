import type { NextPage } from 'next'

import { Main, Section, SiderLayout } from '../../components/Layout'
import { NAV } from './data'

const CompletedActions: NextPage = () => {
  return (
    <SiderLayout nav={NAV}>
      <Main>
        <Section title="Completed Actions" titleSize="big">
          Completed Actions
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default CompletedActions
