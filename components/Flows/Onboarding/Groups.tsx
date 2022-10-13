import { Button, List, Space, Tag } from 'antd'

import {
  EventFragment,
  EventParticipationStatus,
  EventStatus,
} from '../../../services/lfca-backend'
import { EventCard } from '../../EventCard'
import { EventCardSkeleton } from '../../EventCard/EventCardSkeleton'
import { DefaultStepProps } from './..'

const GROUPS: EventFragment[] = [
  {
    __typename: 'Event',
    description:
      '<html-blob><p><b>Welcome to this mastermind group!&nbsp;</b></p><p><b>Mastermind group</b> is a peer-to-peer mentoring group format, used to help members solve their problems with input and advice from the other group members. At the LFCA groups, we connect sustainability practitioners across 10-15 companies from the same industry. This is the space where you can ask questions, bounce ideas, share knowledge, and build collaborations.&nbsp;</p><p><b>Meet your facilitator:</b><br></p><p>For Roxana Buzețelu sustainability is the topic she can talk about no matter when and where. She is passionate about it and continuously learns and speaks about how we can all contribute to building a better future. <br>🌱 Her focus is discovering &amp; implementing solutions.<br>🌱 She advocates for sustainable development - one in which individuals and businesses meet in the middle, to bring together the behavior change we need to see in order to have a more sustainable and equitable planet. <br>🌱 Through the mix of media, educational trainings, and workshops she has developed so far, her aim is to show individuals and companies that change is possible. <u><a href="https://www.linkedin.com/in/roxana-buze%C8%9Belu-9789032b/" id="ow24692" __is_owner="true">https://www.linkedin.com/in/roxana-buze%C8%9Belu-9789032b/</a></u></p><p><b>Agenda:</b><br>00-05 – check-in<br>05-15 – updates round on your sus. projects, sharing victories and struggles (no discussion)<br>15-55 – brainstorming sessions, knowledge sharing on the topics relevant for the group at the moment<br>55-00 – check-out, ideas for the next meeting discussions</p><p><b>Come prepared:</b><br>- Think about the most important challenges that you are facing right now, formulate questions<br>- Reflect on what worked well for you and share your victories and best practices with the group<br>- Turn your camera on and try to avoid the second screen<br>- Invite a colleague instead of you if you can\'t make it to the meeting</p><p><br>Looking forward to this series of fruitful exchanges with you!<br></p></html-blob>',
    end: '2022-10-12T09:00:00.000Z',
    id: '59dklorvccgmj7e5s0943lskbg',
    isAllDay: false,
    participationRequests: [
      {
        __typename: 'EventParticipationRequest',
        id: 'e70d1c27-7491-49f0-9d09-4993927a011a',
        status: EventParticipationStatus.APPROVED,
        user: {
          __typename: 'User',
          company: {
            __typename: 'Company',
            id: '-MDouCh1YYabR9H2wkkN',
            logoUrl:
              'https://res.cloudinary.com/dhpk1grmy/image/upload/v1643378294/logos/wpxw1meapgthvckggygd.jpg',
            name: 'nu3',
          },
          firstName: 'Marion ',
          id: '3GpyCsnoprQHzWFHFmKPYvSpiRH3',
          lastName: 'Bayet ',
        },
      },
      {
        __typename: 'EventParticipationRequest',
        id: '1823fa3d-61fb-4d5b-a5c8-13f124710464',
        status: EventParticipationStatus.APPROVED,
        user: {
          __typename: 'User',
          company: {
            __typename: 'Company',
            id: '-MM_O8f8_l1xkEo9wqFd',
            logoUrl:
              'https://res.cloudinary.com/dhpk1grmy/image/upload/v1605871362/logos/buunr0gecwwhtszmzfeg.jpg',
            name: 'erdbär GmbH',
          },
          firstName: 'Lena',
          id: '79iDG9lU7Wb6KWRBh9Ih1JkZONx1',
          lastName: 'Kloß',
        },
      },
    ],
    participationRequestsApprovedCount: 17,
    participationRequestsPendingCount: 0,
    participationRequestStatus: null,
    recurrence: 'RRULE:FREQ=WEEKLY;WKST=SU;INTERVAL=4;BYDAY=WE',
    start: '2022-10-12T08:00:00.000Z',
    status: EventStatus.RUNNING,
    title: 'Food Products (e-commerce)',
    videoConferenceUrl: 'https://meet.google.com/tfk-njja-xun',
  },
]

export const Groups = ({ onNext }: DefaultStepProps) => {
  return (
    <div>
      <Tag className="super-text">Company Info</Tag>
      <h1>{`Let’s get together! 🥳`}</h1>
      <div className="description">
        {`Our group formats are the heartbeat of our community. Every new member starts with our free onboarding sessions. During the webinar you will:`}
        <ul style={{ margin: '15px 0 0' }}>
          <li>get to know peers from our community</li>
          <li>understand our tools, action pillars and group formats</li>
          <li>learn how to build a climate strategy</li>
        </ul>
      </div>

      <List
        dataSource={GROUPS}
        renderItem={(item) => (
          <List.Item className="list-item" key={item.id}>
            <EventCardSkeleton fetching={false} type={'small'}>
              <EventCard
                appliedEventsCount={0}
                event={item}
                participatingEventsCount={0}
                type={'small'}
              />
            </EventCardSkeleton>
          </List.Item>
        )}
      />

      <Space>
        <Button onClick={onNext} size="large" type="primary">
          Join group
        </Button>
      </Space>
    </div>
  )
}

export const GroupsSide = () => {
  return null
}
