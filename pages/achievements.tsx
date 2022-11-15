import type { NextPage } from 'next'

import { AchievementsList } from '../components/AchievementsList'
import { Main, Section, SiderLayout } from '../components/Layout'
import { withAuth } from '../utils-server-only'

const Achievements: NextPage = () => {
  return (
    <SiderLayout>
      <Main>
        <Section title="Achievements" titleSize="big">
          <AchievementsList />
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default withAuth(Achievements)
