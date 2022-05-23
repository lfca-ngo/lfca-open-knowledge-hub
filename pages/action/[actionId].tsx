import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Drawer, message, Tabs } from 'antd'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { ActionDetails, ActionsBar } from '../../components/ActionDetails'
import { Comments } from '../../components/Comments'
import { CompleteActionForm } from '../../components/CompleteActionForm'
import { Main, Section, Sider, SiderLayout } from '../../components/Layout'
import { RequirementsList } from '../../components/RequirementsList'
import { ShowMore } from '../../components/ShowMore'
import {
  ContentfulActionFields,
  ContentfulServiceProviderFields,
  fetchAllActions,
  fetchAllServiceProviders,
} from '../../services/contentful'
import { EMPTY_ACTION } from '../../services/contentful/utils'
import {
  useCompanyActionDetailsQuery,
  useCompleteCompanyActionMutation,
  usePlanCompanyActionMutation,
} from '../../services/lfca-backend'
import { renderTools } from '../../tools'
import { actionHasReviews } from '../../utils'
import { withAuth } from '../../utils/with-auth'

const { TabPane } = Tabs

interface ActionProps {
  action: ContentfulActionFields
  serviceProviders?: ContentfulServiceProviderFields[]
}

const Action: NextPage<ActionProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { action } = props
  const [{ data: actionData, fetching: fetchingActionData }] =
    useCompanyActionDetailsQuery({
      variables: { input: { actionContentId: action.actionId } },
    })

  const [{ fetching: fetchingPlanCompanyAction }, planCompanyAction] =
    usePlanCompanyActionMutation()
  const [{ fetching: fetchingCompleteCompanyAction }, completeCompanyAction] =
    useCompleteCompanyActionMutation()

  const handleComplete = async () => {
    if (actionData?.companyAction.completedAt) {
      await completeCompanyAction({
        input: {
          actionContentId: action.actionId,
          isCompleted: false,
        },
      })
    } else {
      setIsOpen(true)
    }
  }

  const handlePlan = async () => {
    planCompanyAction({
      input: {
        actionContentId: action.actionId,
        isPlanned: !actionData?.companyAction.plannedAt,
      },
    }).then(({ data, error }) => {
      if (error) message.error(error.message)
      else {
        if (data?.planCompanyAction?.plannedAt) {
          message.success('Marked as planned')
        } else {
          message.info('Removed from planned actions')
        }
      }
    })
  }

  return (
    <SiderLayout goBack={() => router.back()}>
      <Main>
        <Section>
          <ActionDetails
            action={actionData?.companyAction || EMPTY_ACTION}
            fetching={fetchingActionData}
          />
        </Section>
        <Section>
          <Tabs defaultActiveKey="1">
            <TabPane key="1" tab="Description">
              <ShowMore
                maxHeight={140}
                text={
                  action?.aboutText &&
                  documentToReactComponents(action?.aboutText)
                }
              />
            </TabPane>
            <TabPane key="2" tab="How To">
              <ShowMore
                maxHeight={140}
                text={<RequirementsList requirements={action?.requirements} />}
              />
            </TabPane>
            <TabPane key="3" tab="Benefits">
              <ShowMore
                maxHeight={140}
                text={
                  action?.benefits &&
                  documentToReactComponents(action?.benefits)
                }
              />
            </TabPane>
          </Tabs>
        </Section>
        {/* Render additional sections */}
        {renderTools(
          action?.customSections?.filter((s) => s.position === 'main'),
          props
        )}
      </Main>

      <Sider>
        <Section title="Your progress">
          <ActionsBar
            fetchingCompleted={
              fetchingActionData || fetchingCompleteCompanyAction
            }
            fetchingPlanned={fetchingActionData || fetchingPlanCompanyAction}
            isCompleted={!!actionData?.companyAction.completedAt}
            isPlanned={!!actionData?.companyAction.plannedAt}
            onComplete={handleComplete}
            onPlan={handlePlan}
          />
        </Section>
        <Section title="Community">
          <Comments actionContentId={action.actionId} />
        </Section>
        <Section title="Attachments">Something</Section>
        {/* Render additional sections */}
        {renderTools(
          action?.customSections?.filter((s) => s.position === 'sider'),
          props
        )}
      </Sider>

      <Drawer
        className="drawer-md"
        onClose={() => setIsOpen(false)}
        visible={isOpen}
      >
        <CompleteActionForm
          actionContentId={action.actionId}
          onComplete={() => setIsOpen(false)}
          serviceProviders={props.serviceProviders}
          withReviewForm={actionHasReviews(action)}
        />
      </Drawer>
    </SiderLayout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const actionId = params?.actionId as string
  const actionsById = await fetchAllActions()
  const action = actionsById[actionId]

  let serviceProviders = []
  if (actionHasReviews(action)) {
    serviceProviders = await fetchAllServiceProviders()
  }

  return {
    props: {
      action,
      serviceProviders,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const actionsById = await fetchAllActions()
  const paths = Object.keys(actionsById).map((actionId) => ({
    params: { actionId },
  }))
  return {
    fallback: false,
    paths: paths,
  }
}

export default withAuth(Action)
