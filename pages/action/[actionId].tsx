import { BulbOutlined } from '@ant-design/icons'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Button, Divider, Spin, Tabs } from 'antd'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { ActionBar } from '../../components/ActionBar'
import { ActionDetails } from '../../components/ActionDetails'
import { ActionHistory } from '../../components/ActionHistory'
import { CompanyActionListItemFragmentWithRootCategory } from '../../components/ActionsCarousel'
import { AttachmentsList } from '../../components/AttachmentsList'
import { Comments } from '../../components/Comments'
import { EmptyState } from '../../components/EmptyState'
import { Main, Section, Sider, SiderLayout } from '../../components/Layout'
import {
  scrollToId,
  SectionWrapper,
} from '../../components/Layout/SectionWrapper'
import { LogoGroup } from '../../components/LogoGroup'
import { RequirementsList } from '../../components/RequirementsList'
import { ShowMore } from '../../components/ShowMore'
import categoryTreeData from '../../next-fetch-during-build/data/_category-tree-data.json'
import {
  ContentfulActionFields,
  fetchAllActions,
  RootCategoryLookUpProps,
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

interface ActionProps {
  action: ContentfulActionFields
}

const Action: NextPage<ActionProps> = ({ action }) => {
  const [activeNavItem, setActiveNavItem] = useState('')
  const rootCategoryLookUp: RootCategoryLookUpProps =
    categoryTreeData.rootCategoryLookUp
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
  const rootCategory = rootCategoryLookUp[firstCategory?.id]
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
        <Section className="sticky">
          <Tabs
            activeKey={activeNavItem}
            className="sticky-tabs"
            items={[
              {
                key: 'about',
                label: 'Description',
              },
              {
                key: 'community',
                label: 'Community',
              },
            ]}
            onChange={(key) => scrollToId(key)}
          />
        </Section>

        <SectionWrapper
          id={'about'}
          key={'about'}
          setActiveNavItem={setActiveNavItem}
        >
          <Section>
            <ShowMore
              maxHeight={140}
              text={
                action?.aboutText &&
                documentToReactComponents(action?.aboutText, options)
              }
            />
          </Section>
        </SectionWrapper>

        <SectionWrapper
          id={'community'}
          key={'community'}
          setActiveNavItem={setActiveNavItem}
        >
          <Section>
            <Section title="Community">
              <LogoGroup
                data={actionData?.companyAction?.recentCompaniesDoing}
                label={`${actionData?.companyAction.companiesDoingCount} members working on this`}
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
          </Section>
        </SectionWrapper>

        <Section>
          <RequirementsList
            actionContentId={action.actionId}
            requirements={actionData?.companyAction?.requirements}
            requirementsContent={action?.requirements}
          />
        </Section>

        <Section>
          <ShowMore
            maxHeight={140}
            text={
              action?.examples &&
              documentToReactComponents(action?.examples, options)
            }
          />
        </Section>

        <Section>
          <ShowMore
            maxHeight={140}
            text={
              action?.benefits &&
              documentToReactComponents(action?.benefits, options)
            }
          />
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
        <Section className="sticky">
          {actionData?.companyAction && (
            <ActionBar
              action={actionData?.companyAction}
              actionDetails={action}
            />
          )}
        </Section>
      </Sider>
    </SiderLayout>
  )
}

export const getStaticProps: GetStaticProps<ActionProps> = async ({
  params,
}) => {
  const actionId = params?.actionId as string
  const actionsById = await fetchAllActions()
  const action = actionsById[actionId]

  return {
    props: {
      action,
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
