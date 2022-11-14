import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

import { EventSignUp } from '../../../components/EventSignUp'
import { OneColLayout } from '../../../components/Layout'
import EventBackgroundImage from '../../../public/img/event-bg-image.png'
import {
  EventDocument,
  EventFragment,
  EventQuery,
  EventQueryVariables,
  ssrClient,
} from '../../../services/lfca-backend'

interface EventSignUpPageProps {
  event: EventFragment
}

const EventSignUpPage: NextPage<EventSignUpPageProps> = ({ event }) => {
  const { query } = useRouter()
  const { mode, token } = query

  return (
    <OneColLayout backgroundImage={EventBackgroundImage}>
      <EventSignUp
        event={event}
        mode={mode as string}
        token={token as string}
      />
    </OneColLayout>
  )
}

export const getStaticProps: GetStaticProps<EventSignUpPageProps> = async ({
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

export default EventSignUpPage
