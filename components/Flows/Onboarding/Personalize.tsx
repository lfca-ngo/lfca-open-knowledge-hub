import { Button, Drawer, Space, Tag } from 'antd'
import { useState } from 'react'

import {
  CompanyActionListItemFragment,
  EMPTY_ACTIONS,
  useCompanyActionsListQuery,
} from '../../../services/lfca-backend'
import { actionHasReviews } from '../../../utils'
import { withAuth } from '../../../utils/with-auth'
import { ActionsList } from '../../ActionsList'
import { CompleteActionForm } from '../../CompleteActionForm'
import { DefaultStepProps } from './..'

export const PersonalizeContent = ({ onNext }: DefaultStepProps) => {
  const [activeAction, setActiveAction] =
    useState<CompanyActionListItemFragment>()
  const [selectedActionContentId, setSelectedActionContentId] = useState<
    string | null
  >(null)

  const [{ data, fetching: fetchingActions }] = useCompanyActionsListQuery()

  return (
    <div>
      <Tag className="super-text">Company Info</Tag>
      <h1>{`Where are you on your climate journey? 🎯`}</h1>
      <div className="description">
        {`Let's start with a simple exercise: Did you already take climate action in your company? Which actions have you taken and what have you learned?`}
      </div>

      <ActionsList
        actionListItemProps={{
          onCtaClick: (action) => {
            setActiveAction(action)
            setSelectedActionContentId(action.contentId)
          },
          selectText: 'Select',
          showInfoBox: true,
          unselectText: 'Unselect',
        }}
        actions={data?.companyActions || EMPTY_ACTIONS}
        fetching={fetchingActions}
        hideCategoryTree
      />

      <Space>
        <Button onClick={onNext} size="large" type="primary">
          Join group
        </Button>
      </Space>

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
  return null
}
