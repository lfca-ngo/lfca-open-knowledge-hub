import { InfoOutlined } from '@ant-design/icons'
import { Avatar, Card, Popover, Skeleton, Tag } from 'antd'
import Image from 'next/image'

const ICON_SIZE = 24

import { ContentfulSourceFields } from '../../services/contentful'
import styles from './styles.module.less'

interface SourcesCardProps {
  fetching?: boolean
  item: ContentfulSourceFields
}

export const SourcesCard = ({ fetching, item }: SourcesCardProps) => {
  const renderSourceType = () => {
    const isMiroUrl = item.url?.toLowerCase().includes('miro.com')
    const isGoogleSlidesUrl = item.url
      ?.toLowerCase()
      .includes('docs.google.com/presentation')
    const isGoogleSheetsUrl = item.url
      ?.toLowerCase()
      .includes('docs.google.com/spreadsheets')

    if (isGoogleSheetsUrl)
      return (
        <Image
          alt="stripe"
          height={ICON_SIZE}
          src={`/img/icons/google-sheets.svg`}
          width={ICON_SIZE}
        />
      )

    if (isMiroUrl)
      return (
        <Image
          alt="stripe"
          height={ICON_SIZE}
          src={`/img/icons/miro.svg`}
          width={ICON_SIZE}
        />
      )

    if (isGoogleSlidesUrl)
      return (
        <Image
          alt="stripe"
          height={ICON_SIZE}
          src={`/img/icons/google-slides.svg`}
          width={ICON_SIZE}
        />
      )

    return <Avatar className="black-inverse" icon={<InfoOutlined />} />
  }

  const ContentCard = (
    <Card className={styles.sourcesCard}>
      {item.previewImage?.url ? (
        <div className={styles.imageWrapper}>
          <Image
            alt={item.title}
            layout="fill"
            objectFit="cover"
            src={item.previewImage?.url}
          />
        </div>
      ) : null}
      <Card.Meta
        avatar={<Popover content={`Category`}>{renderSourceType()}</Popover>}
        description={
          <div className={styles.description}>{item.description}</div>
        }
        title={
          <div className={styles.titleWrapper}>
            <div className={styles.date}>
              <Tag className="black-inverse">{item.tags}</Tag>
            </div>
            <div className={styles.text}>{item.title}</div>
          </div>
        }
      />
    </Card>
  )

  if (fetching)
    return (
      <Skeleton
        active
        avatar={{ shape: 'square' }}
        className={styles.skeleton}
        paragraph={{ rows: 1 }}
      />
    )

  return item.url ? (
    <a
      className={styles.linkWrapper}
      href={item.url}
      rel="noreferrer"
      target="_blank"
    >
      {ContentCard}
    </a>
  ) : (
    ContentCard
  )
}
