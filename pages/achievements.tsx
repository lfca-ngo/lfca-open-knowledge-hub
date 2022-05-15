import type { NextPage } from 'next'

import { Main, Section, SiderLayout } from '../components/Layout'
import { AchievementsList } from '../components/AchievementsList'

export const FAKE_ACHIEVEMENTS = [
  {
    name: 'Custom Microsite',
    recommendedActions: [
      {
        completedAt: '2020-01-01',
        title: 'Offset',
      },
    ],
    requiredActions: [{ completedAt: '2020-01-01', title: 'Measure' }],
  },
  {
    name: 'TFCA Qualification',
    recommendedActions: [
      {
        completedAt: '2020-01-01',
        title: 'Offset',
      },
    ],
    requiredActions: [
      { completedAt: '2020-01-01', title: 'Measure' },
      { completedAt: null, title: 'TFCA' },
    ],
  },
]

const Achievements: NextPage = () => {
  return (
    <SiderLayout>
      <Main>
        <Section title="Achievements" titleSize="big">
          <AchievementsList achievements={FAKE_ACHIEVEMENTS} />
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default Achievements
