import { Modal } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'
import React, { useState } from 'react'

import { ContentfulSourceFields } from '../../services/contentful'
import { BlockSource } from './BlockSource'
import { InlineSource } from './InlineSource'
import styles from './styles.module.less'

export const Source = ({
  file,
  inline,
  optionalStyles,
  title,
  type,
  url,
}: ContentfulSourceFields & {
  inline: boolean
  optionalStyles?: React.CSSProperties
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const openModal = () => setIsVisible(true)
  const closeModal = () => setIsVisible(false)

  // by default take the url
  const fileUrl = url || `https:${file?.fields?.file?.url}`

  const linkSettings =
    type === 'image'
      ? {
          onClick: openModal,
        }
      : {
          href: fileUrl,
          rel: 'noreferrer',
          target: '_blank',
        }

  const render = () => {
    switch (inline) {
      case true:
        return (
          <InlineSource linkSettings={linkSettings} title={title} type={type} />
        )
      default:
        return (
          <BlockSource linkSettings={linkSettings} title={title} type={type} />
        )
    }
  }

  return (
    <span
      className={classNames(styles['source'], { block: !inline })}
      style={inline ? optionalStyles : {}}
    >
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
