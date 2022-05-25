import type { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { OnboardingLeaderSteps } from '../components/Flows'
import { StepsLayout } from '../components/Layout'
import { useUser } from '../hooks/user'
import { fetchAllQuestionnaires } from '../services/contentful'
import { withAuth } from '../utils/with-auth'

const OnboardingLeader: NextPage = (props: any) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const router = useRouter()
  const { user } = useUser()

  const handleOnNext = () => {
    if (currentStepIndex === OnboardingLeaderSteps.length - 1) {
      router.push('/')
    } else {
      setCurrentStepIndex((i) => i + 1)
    }
  }

  const Step = OnboardingLeaderSteps[currentStepIndex]?.component

  return (
    <StepsLayout
      canClose
      currentStepIndex={currentStepIndex}
      onClose={() => router.push('/')}
      steps={OnboardingLeaderSteps}
    >
      {Step ? (
        <Step
          onNext={handleOnNext}
          questionnaire={props?.questionnaires[user?.country || 'eu-DE']}
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
