import { Tabs } from 'antd'
import type { GetStaticProps, NextPage } from 'next'
import React, { useState } from 'react'

import { EmptyState } from '../../components/EmptyState'
import { EventsList } from '../../components/EventsList'
import { getEventsByParticipationStatus } from '../../components/EventsList/utils'
import { Main, Section, Sider, SiderLayout } from '../../components/Layout'
import { fetchAllContentCollections } from '../../services/contentful/fetch-all-content-collections'
import { EventCategory, useEventsQuery } from '../../services/lfca-backend'
import { eventCategoryMetaData } from '../../utils/events'
import { withAuth } from '../../utils-server-only'

const Groups: NextPage = () => {
  const [eventCategory, setEventCategory] = useState<EventCategory | undefined>(
    EventCategory.MASTERMIND_GROUP
  )

  // specific events by category
  const [{ data, error, fetching }] = useEventsQuery({
    variables: {
      input: {
        filter: {
          category: eventCategory,
          includeExpired: false,
        },
      },
    },
  })

  const eventsByParticipation = getEventsByParticipationStatus(data?.events)

  // all events to check for users upcoming events
  const [{ data: usersEventsData, fetching: fetchingUsersEvents }] =
    useEventsQuery({
      variables: {
        input: {
          filter: {
            includeExpired: false,
          },
        },
      },
    })

  const usersEventsByParticipation = getEventsByParticipationStatus(
    usersEventsData?.events
  )

  return (
    <SiderLayout>
      <Main>
        <Section
          bordered={false}
          title={<span>Groups & Events</span>}
          titleSize="big"
        >
          <Tabs
            activeKey={eventCategory}
            items={Object.keys(EventCategory)
              .sort((a, b) => {
                return (
                  eventCategoryMetaData(b as EventCategory).sortValue -
                  eventCategoryMetaData(a as EventCategory).sortValue
                )
              })
              .map((category) => ({
                key: category,
                label: (
                  <>
                    {eventCategoryMetaData(category as EventCategory).icon}
                    {eventCategoryMetaData(category as EventCategory).name}
                  </>
                ),
              }))}
            onChange={(key) => setEventCategory(key as EventCategory)}
          />

          {/* Events and description for the selected category */}

          {eventCategoryMetaData(eventCategory as EventCategory).description}

          <EventsList
            customEmptyState={
              <EmptyState
                alignment="center"
                size="small"
                text="Keep an eye on your emails to make sure you don't miss out!"
                title="No upcoming groups or events"
              />
            }
            events={error ? [] : eventsByParticipation.otherEvents}
            fetching={fetching}
            isAllowedToJoin={
              error ? false : eventsByParticipation.appliedEvents?.length < 1
            }
            participatingEvents={
              error ? [] : eventsByParticipation.participatingEvents
            }
          />
        </Section>
      </Main>
      <Sider>
        <Section bordered={true} title="Your groups">
          <EventsList
            events={error ? [] : usersEventsByParticipation.participatingEvents}
            fetching={fetchingUsersEvents}
            isAllowedToJoin={true}
            participatingEvents={
              error ? [] : usersEventsByParticipation.participatingEvents
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
