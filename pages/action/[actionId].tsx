import { BulbOutlined } from '@ant-design/icons'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Button, Divider, Spin, Tabs } from 'antd'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { ActionBar } from '../../components/ActionBar'
import { ActionDetails } from '../../components/ActionDetails'
import { ActionHistory } from '../../components/ActionHistory'
import { CompanyActionListItemFragmentWithRootCategory } from '../../components/ActionsCarousel'
import { AttachmentsList } from '../../components/AttachmentsList'
import { Comments } from '../../components/Comments'
import { EmptyState } from '../../components/EmptyState'
import { Main, Section, Sider, SiderLayout } from '../../components/Layout'
import { LogoGroup } from '../../components/LogoGroup'
import { RequirementsList } from '../../components/RequirementsList'
import { ShowMore } from '../../components/ShowMore'
import {
  CategoryTreeProps,
  ContentfulActionFields,
  fetchAllActions,
  fetchRootCategoryTree,
} from '../../services/contentful'
import {
  EMPTY_ACTION,
  useActionCommentAttachmentsQuery,
  useCompanyActionDetailsQuery,
  useCompanyActionExtendedDetailsQuery,
} from '../../services/lfca-backend'
import { ServiceProviderComparison } from '../../tools/ServiceProviderComparison'
import { DEFAULT_SUPPORT_EMAIL } from '../../utils'
import { options } from '../../utils/richTextOptions'
import { withAuth } from '../../utils/with-auth'

const { TabPane } = Tabs

interface ActionProps {
  action: ContentfulActionFields
  categoryTree: CategoryTreeProps
}

const Action: NextPage<ActionProps> = ({ action, categoryTree }) => {
  const router = useRouter()

  const [{ data: actionData, fetching: fetchingAction }] =
    useCompanyActionDetailsQuery({
      variables: { input: { actionContentId: action.actionId } },
    })
  const [
    {
      data: actionDataExtended,
      fetching: fetchingActionExtended,
      stale: staleActionExtended,
    },
  ] = useCompanyActionExtendedDetailsQuery({
    requestPolicy: 'cache-and-network',
    variables: { input: { actionContentId: action.actionId } },
  })
  const [{ data: attachmentsData, fetching: fetchingAttachments }] =
    useActionCommentAttachmentsQuery({
      variables: { input: { actionContentId: action.actionId } },
    })

  const [firstCategory] = actionData?.companyAction?.categories || []
  const rootCategory = categoryTree.rootCategoryLookUp[firstCategory?.id]
  const actionDetails = {
    ...actionData?.companyAction,
    rootCategory,
  } as CompanyActionListItemFragmentWithRootCategory

  return (
    <SiderLayout goBack={() => router.back()}>
      <Main>
        <Section>
          <ActionDetails
            action={actionDetails || EMPTY_ACTION}
            fetching={fetchingAction}
          />
        </Section>
        <Section>
          <Tabs defaultActiveKey="1">
            <TabPane key="1" tab="Description">
              <ShowMore
                maxHeight={140}
                text={
                  action?.aboutText &&
                  documentToReactComponents(action?.aboutText, options)
                }
              />
            </TabPane>
            <TabPane key="2" tab="How To">
              <RequirementsList
                actionContentId={action.actionId}
                requirements={actionData?.companyAction?.requirements}
                requirementsContent={action?.requirements}
              />
            </TabPane>
            <TabPane key="3" tab="Examples">
              <ShowMore
                maxHeight={140}
                text={
                  action?.examples &&
                  documentToReactComponents(action?.examples, options)
                }
              />
            </TabPane>
            <TabPane key="4" tab="Benefits">
              <ShowMore
                maxHeight={140}
                text={
                  action?.benefits &&
                  documentToReactComponents(action?.benefits, options)
                }
              />
            </TabPane>
          </Tabs>
        </Section>
        {/* Render optional service provider comparison */}

        {fetchingActionExtended || staleActionExtended ? (
          <Spin />
        ) : actionDataExtended?.companyAction.serviceProviderList ? (
          <ServiceProviderComparison
            serviceProviderList={
              actionDataExtended.companyAction.serviceProviderList
            }
            showTitle={true}
          />
        ) : (
          <EmptyState
            actions={[
              <a href={`mailto:${DEFAULT_SUPPORT_EMAIL}`} key="share">
                <Button size="large" type="primary">
                  Share idea
                </Button>
              </a>,
            ]}
            bordered
            icon={<BulbOutlined />}
            text={
              <div>
                We are gradually adding more and more community powered content
                to the platform. You can check the{' '}
                <Link href={`/action/companyPledge`}>Measurement Action</Link>{' '}
                as an example. If you have relevant content ideas for this
                module, please share them with us!
              </div>
            }
            title="There is more to come..."
          />
        )}
      </Main>

      <Sider>
        <Section title="Your progress">
          {actionData?.companyAction && (
            <ActionBar
              action={actionData?.companyAction}
              actionDetails={action}
            />
          )}
        </Section>
        <Section title="Community">
          <LogoGroup
            data={actionData?.companyAction?.recentCompaniesCompleted}
            label={`${actionData?.companyAction.companiesCompletedCount} members completed this`}
            reverse
            size="large"
          />
          <Divider orientation="left" orientationMargin="0">
            Latest Messages
          </Divider>
          <Comments actionContentId={action.actionId} />
        </Section>
        <Section title="Attachments">
          <AttachmentsList
            attachments={attachmentsData?.actionCommentAttachments || []}
            fetching={fetchingAttachments}
          />
        </Section>
        <Section title="History">
          <ActionHistory contentId={actionData?.companyAction.contentId} />
        </Section>
      </Sider>
    </SiderLayout>
  )
}

export const getStaticProps: GetStaticProps<ActionProps> = async ({
  params,
}) => {
  const categoryTree = await fetchRootCategoryTree()
  const actionId = params?.actionId as string
  const actionsById = await fetchAllActions()
  const action = actionsById[actionId]

  return {
    props: {
      action,
      categoryTree,
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
