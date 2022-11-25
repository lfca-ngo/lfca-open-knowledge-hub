import Link from 'next/link'
import React from 'react'

import { EventFragment } from '../../services/lfca-backend'

export const EventUnsubscribed = ({ event }: { event: EventFragment }) => {
  return (
    <>
      <h1>You successfully unsubscribed from {event.title}!</h1>

      <p>
        You can re-join anytime in our <Link href="/community/groups">app</Link>
        .
      </p>
    </>
  )
}
