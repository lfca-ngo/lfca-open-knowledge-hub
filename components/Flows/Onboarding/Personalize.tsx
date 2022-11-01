import { Button, Drawer, Modal, Space, Tag } from 'antd'
import { useState } from 'react'

import { ContentfulActionFields } from '../../../services/contentful'
import {
  EMPTY_ACTIONS,
  useCompanyActionsListQuery,
} from '../../../services/lfca-backend'
import { actionHasReviews } from '../../../utils'
import { withAuth } from '../../../utils/with-auth'
import { ActionPillars } from '../../ActionPillars'
import { ActionPreview } from '../../ActionPreview'
import { ActionsList } from '../../ActionsList'
import { CompleteActionForm } from '../../CompleteActionForm'
import { DefaultStepProps } from './..'

export const PersonalizeContent = ({
  actionsContent,
  onNext,
  onPrev,
  title,
}: DefaultStepProps & {
  actionsContent?: Record<string, ContentfulActionFields>
}) => {
  const [previewActionId, setPreviewActionId] = useState<string | undefined>()
  const [activeActionIndex, setActiveActionIndex] = useState<number>(-1)
  const [selectedActionContentId, setSelectedActionContentId] = useState<
    string | null
  >(null)

  const [{ data, fetching: fetchingActions }] = useCompanyActionsListQuery()

  // to preview action content, we need the contentful data
  const actionContent = previewActionId && actionsContent?.[previewActionId]
  const activeAction = data?.companyActions[activeActionIndex]

  return (
    <div>
      <Tag className="super-text">{title}</Tag>
      <h1>{`Where are you on your climate journey? 🎯`}</h1>
      <div className="description">
        <p>
          {`Let's start with a simple exercise: Did you already start taking
          climate action in your organization? Update the status of actions that
          you have already taken. But don't get lost: You can always update this
          information later on.`}
        </p>
        <p>
          Tip: You can filter the available actions by stages. See our Action
          Pillars as a reference on the right.
        </p>
      </div>

      <ActionsList
        actionListItemProps={{
          mode: 'compact',
          onCtaClick: (action) => {
            const actionIndex =
              data?.companyActions.findIndex(
                (a) => a.contentId === action.contentId
              ) || -1
            setActiveActionIndex(actionIndex)
            setSelectedActionContentId(action.contentId)
          },
          onToggleInfo(action, actionContentId) {
            const actionIndex =
              data?.companyActions.findIndex(
                (a) => a.contentId === action.contentId
              ) || -1
            setActiveActionIndex(actionIndex)
            setPreviewActionId(actionContentId)
          },
          selectText: 'Select',
          unselectText: 'Unselect',
        }}
        actions={data?.companyActions || EMPTY_ACTIONS}
        fetching={fetchingActions}
        mode="compact"
        pageSize={8}
      />

      <Space style={{ margin: '30px 0 0' }}>
        <Button onClick={onNext} size="large" type="primary">
          Continue
        </Button>
        <Button onClick={onPrev} size="large" type="link">
          Back
        </Button>
      </Space>

      <Modal
        destroyOnClose
        footer={null}
        onCancel={() => setPreviewActionId(undefined)}
        open={!!previewActionId}
        wrapClassName="modal-md"
      >
        {actionContent && activeAction ? (
          <ActionPreview action={activeAction} actionContent={actionContent} />
        ) : (
          'Missing data..'
        )}
      </Modal>

      <Drawer
        className="drawer-md"
        destroyOnClose
        onClose={() => setSelectedActionContentId(null)}
        open={!!selectedActionContentId}
      >
        {selectedActionContentId ? (
          <CompleteActionForm
            actionContentId={selectedActionContentId}
            onComplete={() => setSelectedActionContentId(null)}
            withReviewForm={actionHasReviews(activeAction)}
          />
        ) : null}
      </Drawer>
    </div>
  )
}

export const Personalize = withAuth(PersonalizeContent)

export const PersonalizeSide = () => {
  return (
    <div>
      <ActionPillars />
    </div>
  )
}
