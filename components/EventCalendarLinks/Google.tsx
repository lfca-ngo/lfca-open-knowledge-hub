import Icon from '@ant-design/icons'
import {
  GoogleOAuthProvider,
  hasGrantedAllScopesGoogle,
  useGoogleLogin,
} from '@react-oauth/google'
import { Button, message, Modal, Radio, Space } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'

import { EventFragment } from '../../services/lfca-backend'
import GoogleIcon from './icons/google.svg'

const CALENDAR_SCOPES = [
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/calendar.calendarlist.readonly',
]

export const GoogleButton = ({ event }: GoogleProps) => {
  const [calendarList, setCalendarList] = useState<
    { id?: string; name?: string }[]
  >([])
  const [eventListModalOpen, setEventListModalOpen] = useState(false)
  const [accessToken, setAccessToken] = useState('')
  const [syncLoading, setSyncLoading] = useState(false)
  const [selectedCalendarId, setSelectedCalendarId] = useState<
    string | undefined
  >(undefined)

  const login = useGoogleLogin({
    flow: 'implicit',
    onError: (errorResponse) => {
      setSyncLoading(false)

      message.error(errorResponse.error_description || 'Something went wrong')
    },
    onSuccess: async (tokenResponse) => {
      setSyncLoading(false)

      const { access_token } = tokenResponse

      try {
        const hasAccess = hasGrantedAllScopesGoogle(
          tokenResponse,
          'profile',
          ...CALENDAR_SCOPES
        )
        if (!hasAccess) throw new Error('Missing calendar permission')
        setAccessToken(access_token)

        const calendarList = await axios.get('/api/get-google-calendar-list', {
          params: {
            access_token,
          },
        })
        setCalendarList(calendarList.data)
        setSelectedCalendarId(calendarList.data[0]?.id)
        setEventListModalOpen(true)
      } catch (e) {
        message.error(
          (e as { message?: string }).message || 'Seomthing went wrong'
        )
      }
    },
    scope: CALENDAR_SCOPES.join(' '),
  })

  const handleOk = async () => {
    setSyncLoading(true)
    try {
      await axios.post('/api/add-google-calendar-event', {
        access_token: accessToken,
        calendar_id: selectedCalendarId,
        event,
      })
      setSyncLoading(false)
      setEventListModalOpen(false)
      message.success('Event has been added to you google calendar')
    } catch (e) {
      setSyncLoading(false)
      message.error(
        (e as { message?: string }).message || 'Seomthing went wrong'
      )
    }
  }

  return (
    <>
      <Button
        block
        icon={<Icon component={GoogleIcon} />}
        onClick={() => login()}
        size="large"
      >
        Add to Google Calendar
      </Button>
      <Modal
        confirmLoading={syncLoading}
        onCancel={() => setEventListModalOpen(false)}
        onOk={handleOk}
        open={eventListModalOpen}
        title="Select a calendar where the event should be added"
      >
        <Radio.Group
          onChange={(e) => setSelectedCalendarId(e.target.value)}
          value={selectedCalendarId}
        >
          <Space direction="vertical">
            {calendarList.map((c) => (
              <Radio key={c.id} value={c.id}>
                {c.name}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </Modal>
    </>
  )
}

interface GoogleProps {
  event: EventFragment
}

export const Google = (props: GoogleProps) => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <GoogleButton {...props} />
    </GoogleOAuthProvider>
  )
}
