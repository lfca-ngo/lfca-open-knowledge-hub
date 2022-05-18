import type { NextPage } from 'next'

import { AchievementsList } from '../components/AchievementsList'
import { Main, Section, SiderLayout } from '../components/Layout'
import { useCompanyAchievementsQuery } from '../services/lfca-backend'
import { withAuth } from '../utils/with-auth'

const Achievements: NextPage = () => {
  const [{ data }] = useCompanyAchievementsQuery()

  return (
    <SiderLayout>
      <Main>
        <Section title="Achievements" titleSize="big">
          <AchievementsList
            achievements={data?.company.program.achievements || []}
          />
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default withAuth(Achievements)
