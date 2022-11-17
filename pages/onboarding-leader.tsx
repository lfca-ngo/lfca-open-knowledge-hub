import type { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'

import {
  Commit,
  Footprint,
  Invite,
  Share,
} from '../components/Flows/OnboardingLeader'
import { StepsLayout } from '../components/Layout'
import { useUser } from '../hooks/user'
import { useSteps } from '../hooks/useSteps'
import {
  ContentfulQuestionnaireFields,
  fetchAllQuestionnaires,
} from '../services/contentful'
import { DEFAULT_COUNTRY } from '../utils'
import { withAuth } from '../utils-server-only'

interface OnboardingLeaderProps {
  questionnaires: Record<string, ContentfulQuestionnaireFields>
}

const OnboardingLeader: NextPage<OnboardingLeaderProps> = ({
  questionnaires,
}) => {
  const router = useRouter()
  const { user } = useUser()

  const OnboardingLeaderSteps = [
    {
      component: Commit,
      title: 'Pledge',
    },
    {
      component: Invite,
      title: 'Invite',
    },
    {
      component: Footprint,
      title: 'Footprint',
    },
    {
      component: Share,
      title: 'Share the news',
    },
  ]

  const { currentStepIndex, next } = useSteps(
    OnboardingLeaderSteps.length,
    () => router.push('/')
  )

  const Step = OnboardingLeaderSteps[currentStepIndex]?.component
  const userCountry = user?.country || DEFAULT_COUNTRY
  const defaultQuestionnaire = questionnaires[DEFAULT_COUNTRY]

  return (
    <StepsLayout
      canClose
      currentStepIndex={currentStepIndex}
      onClose={() => router.push('/')}
      steps={OnboardingLeaderSteps}
    >
      {Step ? (
        <Step
          onNext={next}
          questionnaire={questionnaires[userCountry] || defaultQuestionnaire}
        />
      ) : null}
    </StepsLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const questionnaires = await fetchAllQuestionnaires()

  return {
    props: {
      questionnaires,
    },
  }
}

export default withAuth(OnboardingLeader)
