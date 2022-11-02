import {
  CopyOutlined,
  LinkedinOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
import { Alert, Button, Col, Input, message, Row } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { LinkedinShareButton } from 'react-share'

import { useUser } from '../../hooks/user'
import { useCreateInvite } from '../../services/next-server'
import { copyTextToClipboard } from '../../utils'
import styles from './styles.module.less'

const BTN_WIDTH = '60'

interface ShareImageProps {
  hideImage?: boolean
  hideShareButtons?: boolean
  roundedCorners?: boolean
}

export const ShareImage = ({
  hideImage = false,
  hideShareButtons = false,
  roundedCorners = true,
}: ShareImageProps) => {
  const executedRef = useRef(false)
  const { user } = useUser()

  const [{ data, error, fetching }, createInvite] = useCreateInvite()

  useEffect(() => {
    if (user?.picture && !executedRef.current) {
      // make sure we only execute this once
      createInvite({
        country: user?.country,
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
    data?.shortLink &&
      copyTextToClipboard(
        data?.shortLink,
        (note: string, hasCopied: boolean) => {
          if (hasCopied) {
            message.success(note)
          } else message.error(note)
        }
      )
  }

  return (
    <div className="share-image">
      {error && <Alert message={error} showIcon type="error" />}
      {!fetching && !user?.picture && (
        <Alert
          message="Please upload a personal picture to enable this feature"
          showIcon
          style={{ margin: '20px 0' }}
          type="warning"
        />
      )}
      {!hideShareButtons && (
        <Row gutter={16}>
          <Col md={12} xs={24}>
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
          </Col>
          <Col md={12} xs={24}>
            {data?.shortLink && (
              <LinkedinShareButton
                style={{ width: '100%' }}
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
          </Col>
        </Row>
      )}
      {!hideImage && (
        <div
          className={classNames(styles['sharing-preview'], {
            'rounded-corners': roundedCorners,
          })}
        >
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
      )}
    </div>
  )
}
