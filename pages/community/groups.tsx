import type { GetStaticProps, NextPage } from 'next'
import React from 'react'

import { EventsList } from '../../components/EventsList'
import { Main, Section, Sider, SiderLayout } from '../../components/Layout'
import { fetchAllContentCollections } from '../../services/contentful/fetch-all-content-collections'
import {
  EMPTY_EVENTS_ARRAY,
  EventFragment,
  useEventsQuery,
} from '../../services/lfca-backend'
import { COMMUNITY_NAV } from '../../utils/navs'
import { withAuth } from '../../utils/with-auth'

const Groups: NextPage = () => {
  const [{ data, fetching }] = useEventsQuery()

  const eventsByParticipation = (data?.events || EMPTY_EVENTS_ARRAY).reduce(
    (acc, curr) => {
      if (curr.participationRequestStatus === 'APPROVED') {
        acc.participatingEvents.push(curr)
      } else {
        acc.otherEvents.push(curr)
      }
      return acc
    },
    {
      otherEvents: [],
      participatingEvents: [],
    } as { participatingEvents: EventFragment[]; otherEvents: EventFragment[] }
  )

  return (
    <SiderLayout nav={COMMUNITY_NAV}>
      <Main>
        <h1>Group Formats</h1>

        <Section bordered={false} title="All groups">
          <EventsList
            events={eventsByParticipation.otherEvents}
            fetching={fetching}
          />
        </Section>
      </Main>
      <Sider>
        <Section bordered={false} title="Your groups">
          <EventsList
            events={eventsByParticipation.participatingEvents}
            fetching={fetching}
            small
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
