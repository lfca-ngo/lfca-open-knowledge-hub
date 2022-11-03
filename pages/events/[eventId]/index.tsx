import axios from 'axios'
import { decode } from 'jsonwebtoken'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

import { EventDetails } from '../../../components/EventDetails'
import { OneColLayout } from '../../../components/Layout'
import EventBackgroundImage from '../../../public/img/event-bg-image.png'
import { EventFragment } from '../../../services/lfca-backend'

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
      {!isVerified ? <h1>Not found</h1> : <EventDetails event={event} />}
    </OneColLayout>
  )
}

export const getStaticProps: GetStaticProps<EventPageProps> = async ({
  params,
}) => {
  const eventId = params?.eventId as string

  const options = {
    data: {
      operationName: 'event',
      query: `query event($input: EventInput!) {
          event(input: $input) {
            category
            description
            end
            id
            participationStatus
            recurrenceRule
            start
            status
            title
            videoConferenceUrl
          }
        }`,
      variables: { input: { eventId } },
    },

    headers: {
      Authorization: `Bearer ${process.env.LFCA_BACKED_ADMIN_TOKEN}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    url: process.env.NEXT_PUBLIC_LFCA_BACKED_URL,
  }

  try {
    const response = await axios.request(options)

    const event = response.data.data.event

    return {
      props: {
        event,
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
