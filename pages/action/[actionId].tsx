import { InfoCircleOutlined, OrderedListOutlined } from '@ant-design/icons'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Tabs } from 'antd'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useState } from 'react'

import { ActionDetails } from '../../components/ActionDetails'
import { ActionLastUpdatedAt } from '../../components/ActionLastUpdatedAt'
import { Main, Section, TopNavLayout } from '../../components/Layout'
import {
  scrollToId,
  SectionWrapper,
} from '../../components/Layout/SectionWrapper'
import { RequirementsListTabs } from '../../components/RequirementsListTabs'
import { ShowMore } from '../../components/ShowMore'
import categoryTreeData from '../../public/data/_category-tree-data.json'
import {
  ContentfulActionFields,
  fetchAllActions,
  RootCategoryLookUpProps,
} from '../../services/contentful'
import { EMPTY_ACTION } from '../../services/lfca-backend'
import { DEFAULT_FONT_SIZE, DEFAULT_LINE_HEIGHT, isBrowser } from '../../utils'
import { options } from '../../utils/rich-text-options'
import { withAuth } from '../../utils-server-only'
import styles from './styles.module.less'

interface ActionProps {
  action: ContentfulActionFields
}

const Action: NextPage<ActionProps> = ({ action }) => {
  /**
   * Local State
   */
  const [activeStatusTab, setActiveStatusTab] = useState<string | undefined>()
  const [activeNavItem, setActiveNavItem] = useState('')

  /**
   * Local variables
   */
  const rootCategoryLookUp: RootCategoryLookUpProps =
    categoryTreeData.rootCategoryLookUp

  const [firstCategory] = action.tags || []
  const rootCategory = rootCategoryLookUp[firstCategory?.categoryId]
  const docHeight = isBrowser() ? document.documentElement.offsetHeight : 0
  const tabElement = isBrowser()
    ? (document?.querySelector('#tab-container') as HTMLElement)
    : null
  const tabHeight = tabElement?.offsetHeight || 0

  /**
   * Definition of all scrollable sections
   */
  const sections = [
    {
      children: () => (
        <ShowMore
          buttonProps={{ type: 'link' }}
          maskMode="transparent"
          maxHeight={DEFAULT_FONT_SIZE * DEFAULT_LINE_HEIGHT * 10}
          text={
            action?.aboutText &&
            documentToReactComponents(action?.aboutText, options)
          }
        />
      ),
      hideSectionTitle: true,
      key: 'about',
      label: (
        <span>
          <InfoCircleOutlined /> About
        </span>
      ),
      renderCondition: () => true,
    },
    {
      children: () => (
        <RequirementsListTabs
          actionContent={action}
          activeStatusTab={activeStatusTab}
          setActiveStatusTab={setActiveStatusTab}
        />
      ),
      key: 'how-to',
      label: (
        <span>
          <OrderedListOutlined /> Steps
        </span>
      ),
      renderCondition: () => true,
    },
  ]

  return (
    <TopNavLayout>
      <Main>
        <Section className={styles['header-section']}>
          <ActionDetails
            action={action || EMPTY_ACTION}
            fetching={false}
            rootCategory={rootCategory}
          />
        </Section>
        <Section className="sticky" id="tab-container">
          <Tabs
            activeKey={activeNavItem}
            className={styles['tabs']}
            items={sections.map((s) => ({ ...s, children: null }))}
            onChange={(key) => scrollToId(key)}
            size="middle"
            tabBarExtraContent={
              <ActionLastUpdatedAt lastUpdatedAt={action.lastUpdatedAt} />
            }
          />
        </Section>

        <div className={styles['sections']}>
          {sections
            .filter((s) => s.renderCondition)
            .map((s, i) => (
              <SectionWrapper
                id={s.key}
                intersectionOptions={{
                  initialInView: i === 0,
                  rootMargin: `0px 0px ${
                    (docHeight - tabHeight - 40) * -1
                  }px 0px`,
                  threshold: 0,
                }}
                key={s.key}
                setActiveNavItem={setActiveNavItem}
              >
                <Section
                  title={s.hideSectionTitle ? null : s.label}
                  titleSize="small"
                >
                  {s.children()}
                </Section>
              </SectionWrapper>
            ))}
        </div>
      </Main>
    </TopNavLayout>
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
