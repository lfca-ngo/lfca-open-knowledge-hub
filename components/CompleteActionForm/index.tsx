import { Divider, notification } from 'antd'

import { ContentfulServiceProviderFields } from '../../services/contentful'
import { useCompleteCompanyActionMutation } from '../../services/lfca-backend'
import { IconSelector } from '../Icons'
import { IconTypes } from '../Icons'
import { Section } from '../Layout'
import { ReviewForm } from '../ReviewForm'
import { CreateCommentForm } from './CreateCommentForm'

interface CompleteActionFormProps {
  actionContentId: string
  onComplete: () => void
  serviceProviders?: ContentfulServiceProviderFields[]
  withReviewForm?: boolean
}

const openNotification = () => {
  notification.info({
    description: `The more you share, the more you'll get out of the community.`,
    icon: <IconSelector color="wine" type={IconTypes.heart} />,
    message: `Awesome, Thanks for sharing!`,
    placement: 'top',
  })
}

export const CompleteActionForm = ({
  actionContentId,
  onComplete,
  serviceProviders,
  withReviewForm = false,
}: CompleteActionFormProps) => {
  // TODO: UI for error states
  const [{ fetching: fetchingCompleteAction }, completeCompanyAction] =
    useCompleteCompanyActionMutation()

  const handleComplete = async () => {
    await completeCompanyAction({
      input: {
        actionContentId,
        isCompleted: true,
        skipRequirementsCheck: true,
      },
    })
    openNotification()
    onComplete()
  }

  return (
    <Section title="Share your learnings">
      {withReviewForm && (
        <>
          <ReviewForm serviceProviders={serviceProviders || []} />
          <Divider />
        </>
      )}
      <CreateCommentForm
        actionContentId={actionContentId}
        isLoading={fetchingCompleteAction}
        onComplete={handleComplete}
      />
    </Section>
  )
}
