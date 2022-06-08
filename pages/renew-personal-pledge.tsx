import type { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { RenewalLeaderSteps } from '../components/Flows'
import { StepsLayout } from '../components/Layout'
import { useUser } from '../hooks/user'
import { fetchAllQuestionnaires } from '../services/contentful'
import { withAuth } from '../utils/with-auth'

const OnboardingLeader: NextPage = (props: any) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const router = useRouter()
  const { user } = useUser()

  const handleOnNext = () => {
    if (currentStepIndex === RenewalLeaderSteps.length - 1) {
      router.push('/')
    } else {
      // always scroll to top
      window?.scrollTo(0, 0)
      setCurrentStepIndex((i) => i + 1)
    }
  }

  const Step = RenewalLeaderSteps[currentStepIndex]?.component

  return (
    <StepsLayout
      canClose
      currentStepIndex={currentStepIndex}
      onClose={() => router.push('/')}
      steps={RenewalLeaderSteps}
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
