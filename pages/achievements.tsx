import type { NextPage } from 'next'

import { AchievementsList } from '../components/AchievementsList'
import { Main, Section, SiderLayout } from '../components/Layout'

export const FAKE_ACHIEVEMENTS = [
  {
    name: 'Custom Microsite',
    options: [
      {
        name: 'Edit Microsite',
        type: 'primary',
      },
      {
        ghost: true,
        name: 'Get badge',
      },
      {
        ghost: true,
        name: 'Visit Microsite',
      },
    ],
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
    options: [
      {
        name: 'Edit Microsite',
        type: 'primary',
      },
      {
        ghost: true,
        name: 'Visit Microsite',
      },
    ],
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
