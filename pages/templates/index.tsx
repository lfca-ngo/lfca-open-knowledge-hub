import { ControlOutlined } from '@ant-design/icons'
import { Divider, List, Radio } from 'antd'
import type { GetStaticProps, NextPage } from 'next'
import React, { useMemo } from 'react'

import { Hero } from '../../components/Hero'
import { Main, Section, TopNavLayout } from '../../components/Layout'
import { NavBar } from '../../components/NavBar'
import { SourcesCard } from '../../components/SourcesCard'
import { getSourceType, SOURCE_TYPES } from '../../components/SourcesCard/utils'
import { usePersistentNavigation } from '../../hooks/usePersistentNavigation'
import {
  ContentfulSourceFields,
  fetchAllTemplates,
} from '../../services/contentful'

export const LS_ACTION_LIST = 'actions_list'

interface TemplatesProps {
  templates: ContentfulSourceFields[]
}

const Templates: NextPage<TemplatesProps> = ({ templates }) => {
  const [selectedSourceType, setSelectedSourceType] = React.useState<
    string | null
  >(null)
  const { persistentNavigation, savePosition } = usePersistentNavigation(true)

  // the currentPage is needed for the list component,
  // the rest for the filter form component

  const currentPage = persistentNavigation?.currentPage

  const templatesWithSourceType = useMemo(() => {
    return templates.map((template) => ({
      ...template,
      sourceType: getSourceType(template),
    }))
  }, [templates])

  return (
    <TopNavLayout
      aside={
        <div>
          <h4>
            <ControlOutlined style={{ marginRight: '6px' }} />
            Filter by type
            <Divider style={{ margin: '20px 0 0' }} />
          </h4>
          {/* radio group for selecting the type */}
          <Radio.Group
            onChange={(e) => {
              setSelectedSourceType(e.target.value)
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            value={selectedSourceType}
          >
            {Object.values(SOURCE_TYPES).map((type) => (
              <Radio key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Radio>
            ))}
            <Radio value={''}>All</Radio>
          </Radio.Group>
        </div>
      }
      asidePosition="left"
      header={<NavBar />}
      hero={
        <Hero
          subtitle={
            <>
              Browse our collection of templates to find the right one for your
              needs. Explore the templates below to discover a variety of
              options that can help you to take action for a better future.
            </>
          }
          title={'Template Library'}
        />
      }
    >
      <Main>
        <Section bordered={false} id="browse-actions">
          <Divider orientation="left" orientationMargin={0}>
            How to guides
          </Divider>
          <List
            className="equal-height"
            dataSource={
              templatesWithSourceType.filter((item) => {
                if (!selectedSourceType) return true
                return item.sourceType === selectedSourceType
              }) || []
            }
            grid={{
              gutter: 24,
              lg: 2,
              md: 2,
              sm: 2,
              xl: 3,
              xs: 1,
              xxl: 4,
            }}
            pagination={{
              current: currentPage,
              defaultCurrent: currentPage,
              onChange: (page) =>
                persistentNavigation &&
                savePosition({
                  ...persistentNavigation,
                  currentPage: page,
                  scrollPosition: window.scrollY,
                }),
              pageSize: 20,
            }}
            renderItem={(item) => {
              return (
                <List.Item>
                  <SourcesCard item={item} />
                </List.Item>
              )
            }}
          />
        </Section>
      </Main>
    </TopNavLayout>
  )
}

export const getStaticProps: GetStaticProps<TemplatesProps> = async () => {
  const templates = await fetchAllTemplates()

  return {
    props: {
      templates,
    },
  }
}

export default Templates
