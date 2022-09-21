import { ExperimentOutlined } from '@ant-design/icons'
import { Popover, Tag } from 'antd'
import type { GetStaticProps, NextPage } from 'next'
import React from 'react'

import { EventsList } from '../../components/EventsList'
import { getEventsByParticipationStatus } from '../../components/EventsList/utils'
import { Main, Section, Sider, SiderLayout } from '../../components/Layout'
import { fetchAllContentCollections } from '../../services/contentful/fetch-all-content-collections'
import { useEventsQuery } from '../../services/lfca-backend'
import { COMMUNITY_NAV } from '../../utils/navs'
import { withAuth } from '../../utils/with-auth'

const Groups: NextPage = () => {
  const [{ data, error, fetching }] = useEventsQuery()

  const eventsByParticipation = getEventsByParticipationStatus(data?.events)

  return (
    <SiderLayout nav={COMMUNITY_NAV}>
      <Main>
        <Section
          bordered={false}
          title={
            <span>
              Mastermind Groups{' '}
              <Popover
                content="During our BETA program, the master mind groups are available to all community members. From 03/23 they will be part of the BASIC+ tiers"
                overlayClassName="popover-lg"
              >
                <Tag
                  color="blue"
                  icon={<ExperimentOutlined />}
                  style={{ verticalAlign: 'middle' }}
                >
                  BETA
                </Tag>
              </Popover>
            </span>
          }
          titleSize="big"
        >
          <div style={{ marginBottom: '40px' }}>
            <p>
              Our online Mastermind Groups connect sustainability practitioners
              across 10-15 companies from the same industry – it’s a
              peer-to-peer mentoring format that supports you in your work on
              sustainability projects. This is the space where you can ask
              questions, bounce ideas, share knowledge, and build
              collaborations.{' '}
            </p>

            <p>
              <b>How to join:</b> Choose the group that fits your business best.
              Once your application is approved, you’ll receive a recurring
              calendar invite. From then on, you’ll be part of a long-term,
              close-knit team – and your hour together each month will be an
              invaluable source of mutual support.
            </p>
          </div>

          <EventsList
            appliedEvents={error ? [] : eventsByParticipation.appliedEvents}
            events={error ? [] : eventsByParticipation.otherEvents}
            fetching={fetching}
            participatingEvents={
              error ? [] : eventsByParticipation.participatingEvents
            }
          />
        </Section>
      </Main>
      <Sider>
        <Section bordered={false} title="Your groups">
          <EventsList
            appliedEvents={error ? [] : eventsByParticipation.appliedEvents}
            events={error ? [] : eventsByParticipation.participatingEvents}
            fetching={fetching}
            participatingEvents={
              error ? [] : eventsByParticipation.participatingEvents
            }
            type="compact"
          />
        </Section>
      </Sider>
    </SiderLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const content = await fetchAllContentCollections()

  return {
    props: {
      content,
    },
  }
}

export default withAuth(Groups)
