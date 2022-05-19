import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Drawer, Tabs } from 'antd'
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
import { useCompanyActionListItemQuery } from '../../services/lfca-backend'
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
    useCompanyActionListItemQuery({
      variables: { input: { actionContentId: action.actionId } },
    })

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
          <ActionsBar onComplete={() => setIsOpen(true)} />
        </Section>
        <Section title="Community">
          <Comments
            actionId={action?.actionId || ''}
            comments={{
              '1': {
                id: '1',
                message: `Something about this action is great. I don't know what though`,
              },
              '2': {
                id: '2',
                message: 'This action is great! I love it!',
              },
            }}
          />
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
