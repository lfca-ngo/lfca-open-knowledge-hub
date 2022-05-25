import { Divider, notification } from 'antd'

import { ContentfulServiceProviderFields } from '../../services/contentful'
import {
  useCompleteCompanyActionMutation,
  useCreateActionCommentMutation,
} from '../../services/lfca-backend'
import { File } from '../FileUpload/FileUpload'
import { IconSelector } from '../Icons'
import { IconTypes } from '../Icons'
import { Section } from '../Layout'
import { ReviewForm } from '../ReviewForm'
import { CommentForm } from './CommentForm'

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

  const [{ fetching: fetchingCreateActionComment }, createActionComment] =
    useCreateActionCommentMutation()

  const handleComplete = async (message: string, attachments?: File[]) => {
    await createActionComment({
      input: {
        actionContentId,
        attachments: attachments?.map((a) => ({
          fileName: a.fileName,
          fileSize: a.fileSize,
          mimeType: a.mimeType,
          source: a.source,
        })),
        message: message,
      },
    })

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
      <CommentForm
        loading={fetchingCompleteAction || fetchingCreateActionComment}
        onSubmit={handleComplete}
      />
    </Section>
  )
}
