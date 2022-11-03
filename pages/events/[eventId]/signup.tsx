import axios from 'axios'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

import { EventSignUp } from '../../../components/EventSignUp'
import { OneColLayout } from '../../../components/Layout'
import { EventFragment } from '../../../services/lfca-backend'

interface EventSignUpPageProps {
  event: EventFragment
}

const EventSignUpPage: NextPage<EventSignUpPageProps> = ({ event }) => {
  const { query } = useRouter()
  const { token } = query

  return (
    <OneColLayout>
      <EventSignUp event={event} token={token as string} />
    </OneColLayout>
  )
}

export const getStaticProps: GetStaticProps<EventSignUpPageProps> = async ({
  params,
}) => {
  const eventId = params?.eventId as string

  const options = {
    data: {
      operationName: 'event',
      query:
        'query event($input: EventInput!) {event(input: $input) {category description id title}}',
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