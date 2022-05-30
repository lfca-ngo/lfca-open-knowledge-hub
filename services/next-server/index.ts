import { useState } from 'react'

import { User } from '../lfca-backend'

interface InviteProps {
  sender: string
  senderImage: User['picture']
  socialDescription: string
  socialTitle: string
  uid: string
}

interface ResultProps {
  ogImageUrl: string
  shortLink: string
}

interface RequestProps {
  data?: ResultProps
  error: string
  fetching: boolean
}

export const useCreateInvite = (): [
  RequestProps,
  (props: InviteProps) => Promise<void>
] => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<ResultProps>()
  const [error, setError] = useState('')

  const createInvite = async (inviteInput: InviteProps) => {
    try {
      setLoading(true)
      const response = await fetch('/api/create-shareable-link', {
        body: JSON.stringify(inviteInput),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      const { ogImageUrl, shortLink } = await response.json()
      setLoading(false)
      setData({ ogImageUrl, shortLink })
    } catch (e) {
      setLoading(false)
      setError('Failed to generate link')
    }
  }

  return [{ data, error, fetching: loading }, createInvite]
}
