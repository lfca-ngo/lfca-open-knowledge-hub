import { EyeOutlined, FilePdfOutlined, LinkOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'
import React, { useState } from 'react'

import { ContentfulSourceFields } from '../../services/contentful'
import styles from './styles.module.less'

export const Source = ({
  file,
  inline,
  title,
  type,
  url,
}: ContentfulSourceFields & { inline: boolean }) => {
  const [isVisible, setIsVisible] = useState(false)
  const openModal = () => setIsVisible(true)
  const closeModal = () => setIsVisible(false)

  // by default take the url
  const fileUrl = url || `https:${file?.fields?.file?.url}`

  const render = () => {
    switch (type) {
      case 'pdf':
        return (
          <a href={fileUrl} rel="noreferrer" target="_blank">
            {!inline && <FilePdfOutlined />}
            {title}
          </a>
        )
      case 'link':
        return (
          <a href={fileUrl} rel="noreferrer" target="_blank">
            {!inline && <LinkOutlined />}
            {title}
          </a>
        )
      case 'image':
        return (
          <a onClick={openModal}>
            {!inline && <EyeOutlined />}
            {title}
          </a>
        )
      default:
        return null
    }
  }

  return (
    <span className={classNames(styles['source'], { block: !inline })}>
      {render()}
      <Modal
        className={styles['preview-modal']}
        onCancel={closeModal}
        open={isVisible}
      >
        <Image
          alt={'preview'}
          className={styles['preview-image']}
          layout="responsive"
          src={fileUrl}
        />
      </Modal>
    </span>
  )
}
