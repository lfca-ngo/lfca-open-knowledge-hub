require('./styles.less')

import {
  CopyOutlined,
  LinkedinOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
import { Alert, Button, Input, message, Space } from 'antd'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { LinkedinShareButton } from 'react-share'

import { useUser } from '../../hooks/user'
import { useCreateInvite } from '../../services/next-server'
import { copyTextToClipboard } from '../../utils'

const BTN_WIDTH = '60'

export const ShareImage = () => {
  const executedRef = useRef(false)
  const { user } = useUser()

  const [{ data, error, fetching }, createInvite] = useCreateInvite()

  useEffect(() => {
    if (user?.picture && !executedRef.current) {
      // make sure we only execute this once
      createInvite({
        sender: user?.firstName,
        senderImage: user?.picture,
        socialDescription:
          'Tackling the climate crisis requires bold action & collaboration. Can we count on you?',
        socialTitle: 'Join our Community',
        uid: user?.id,
      })
      executedRef.current = true
    }
  }, [user, createInvite])

  const handleCopy = () => {
    copyTextToClipboard('mylink', (note: string, hasCopied: boolean) => {
      if (hasCopied) {
        message.success(note)
      } else message.error(note)
    })
  }

  return (
    <div className="share-image">
      {error && <Alert message={error} type="error" />}

      <div className="sharing-preview">
        {data?.ogImageUrl && !fetching ? (
          <Image
            alt="share-image"
            layout="fill"
            objectFit="contain"
            src={data?.ogImageUrl}
          />
        ) : (
          <div className="loading-wrapper">
            <LoadingOutlined />
          </div>
        )}
      </div>

      <Space direction="vertical" style={{ width: '100%' }}>
        <Input.Group compact>
          <Input
            disabled
            size="large"
            style={{ width: `calc(100% - ${BTN_WIDTH}px` }}
            value={data?.shortLink}
          />
          <Button
            icon={<CopyOutlined />}
            onClick={handleCopy}
            size="large"
            style={{ width: `${BTN_WIDTH}px` }}
          />
        </Input.Group>
        {data?.shortLink && (
          <LinkedinShareButton
            summary="..."
            title="Join our Community"
            url={data?.shortLink}
          >
            <Button
              block
              icon={<LinkedinOutlined />}
              size="large"
              type="primary"
            >
              Share on LinkedIn
            </Button>
          </LinkedinShareButton>
        )}
      </Space>
    </div>
  )
}
