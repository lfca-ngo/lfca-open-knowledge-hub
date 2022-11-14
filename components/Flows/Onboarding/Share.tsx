import { GlobalOutlined } from '@ant-design/icons'
import { Button, Space, Tag } from 'antd'
import Image from 'next/image'

import { useUser } from '../../../hooks/user'
import { trackEvent } from '../../../services/analytics'
import { ShareImage } from '../../../tools/ShareImage'
import { withAuth } from '../../../utils-server-only'
import { DefaultStepProps } from './..'
import LinkedInBackground from './images/linked-bg.png'
import styles from './styles.module.less'

const ShareContent = ({ onNext, onPrev, title }: DefaultStepProps) => {
  const goNext = () => {
    // completed form
    trackEvent({
      name: 'completedShareStep',
    })
    onNext?.()
  }

  return (
    <div>
      <Tag className="super-text">{title}</Tag>
      <h1>{`Spread the word! 🎉`}</h1>
      <div className="description">
        <p>
          As a grassroots initiative, we have grown primarily thanks to word of
          mouth.
        </p>
        <p>
          To help engage others in climate action, please share a personal
          invitation on your LinkedIn profile and tag 3 companies you would like
          to see join our community.
        </p>
      </div>

      <ShareImage hideImage />

      <Space style={{ marginTop: '30px' }}>
        <Button onClick={goNext} size="large" type="primary">
          Continue
        </Button>
        <Button onClick={onPrev} size="large" type="link">
          Back
        </Button>
      </Space>
    </div>
  )
}

export const Share = withAuth(ShareContent)

export const ShareSide = () => {
  const { user } = useUser()

  return (
    <div
      className={styles['linked-in-preview']}
      style={{ backgroundImage: `url(${LinkedInBackground.src})` }}
    >
      <div className="post-content">
        <div className="meta-wrapper">
          <div className="face">
            {user?.picture && (
              <Image
                alt="user"
                layout="fill"
                objectFit="cover"
                src={user?.picture}
              />
            )}
          </div>
          <div className="meta">
            <div className="name">{`${user?.firstName} ${user?.lastName}`}</div>
            <div className="job-title">{`${user?.company?.name}`}</div>
            <div className="time">
              now • <GlobalOutlined />
            </div>
          </div>
        </div>

        <div className="post-text">
          Today we joined the lfca.earth community, committing ourselves to
          taking ambitious climate action. We will share the progress and invite
          all of you to join us! #lfca #join
        </div>
      </div>
      <div className="post-image">
        <ShareImage hideShareButtons roundedCorners={false} />
      </div>
    </div>
  )
}
