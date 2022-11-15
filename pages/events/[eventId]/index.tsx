import { decode } from 'jsonwebtoken'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

import { EventDetails } from '../../../components/EventDetails'
import { OneColLayout } from '../../../components/Layout'
import EventBackgroundImage from '../../../public/img/event-bg-image.png'
import {
  EventDocument,
  EventFragment,
  EventQuery,
  EventQueryVariables,
  ssrClient,
} from '../../../services/lfca-backend'

interface EventPageProps {
  event: EventFragment
}

const EventPage: NextPage<EventPageProps> = ({ event }) => {
  const { query } = useRouter()
  const { token } = query

  const isVerified = React.useMemo(() => {
    if (!token || Array.isArray(token)) return false
    const decoded = decode(token) as { eventId: string }

    return decoded?.eventId === event.id
  }, [event, token])

  return (
    <OneColLayout backgroundImage={EventBackgroundImage}>
      {/**TODO: Allow updating event rsvp status (current status needs to be fetched first) */}
      {!isVerified ? <h1>Not found</h1> : <EventDetails event={event} />}
    </OneColLayout>
  )
}

export const getStaticProps: GetStaticProps<EventPageProps> = async ({
  params,
}) => {
  const eventId = params?.eventId as string

  try {
    const res = await ssrClient
      .query<EventQuery, EventQueryVariables>(EventDocument, {
        input: {
          eventId,
        },
      })
      .toPromise()

    const event = res.data?.event
    if (!event) throw new Error('Not found')

    return {
      props: {
        event: event,
      },
      revalidate: 21600, // 6h
    }
  } catch (e) {
    return {
      notFound: true,
      revalidate: 300, // 5min
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: 'blocking',
    paths: [],
  }
}

export default EventPage
