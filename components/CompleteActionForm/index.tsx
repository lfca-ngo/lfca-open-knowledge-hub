import { Divider, notification } from 'antd'

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
  withReviewForm = false,
}: CompleteActionFormProps) => {
  // TODO: UI for error states
  const [{ fetching: fetchingCompleteAction }, completeCompanyAction] =
    useCompleteCompanyActionMutation()

  const [{ fetching: fetchingCreateActionComment }, createActionComment] =
    useCreateActionCommentMutation()

  const handleComplete = async (
    message: string,
    attachments?: File[],
    notes?: string
  ) => {
    if (message || attachments?.length) {
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
    }

    await completeCompanyAction({
      input: {
        actionContentId,
        isCompleted: true,
        notes: notes,
      },
    })
    openNotification()
    onComplete()
  }

  return (
    <Section title="Share your learnings">
      {withReviewForm && (
        <>
          <ReviewForm />
          <Divider />
        </>
      )}
      <CommentForm
        ctaText="Complete Action"
        loading={fetchingCompleteAction || fetchingCreateActionComment}
        onSubmit={handleComplete}
        showNotes
      />
    </Section>
  )
}
