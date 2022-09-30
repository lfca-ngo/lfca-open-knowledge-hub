import { ArrowRightOutlined } from '@ant-design/icons'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Button, List } from 'antd'
import Image from 'next/image'

import { ContentfulContentCollectionFields } from '../../services/contentful'
import styles from './styles.module.less'

export const ContentList = ({
  content = [],
}: {
  content?: ContentfulContentCollectionFields[]
}) => {
  const communityCollection = content.find(
    (c) => c.collectionId === 'community'
  )
  const items = communityCollection?.content || []

  return (
    <List
      className="content-list"
      dataSource={items}
      renderItem={(item) => (
        <List.Item>
          {item?.preview?.url && (
            <div className="image-wrapper">
              <Image
                alt="Community"
                layout="fill"
                objectFit="cover"
                src={item?.preview?.url}
              />
            </div>
          )}
          <div className="content">
            <h4>{item?.title}</h4>
            <div className="description">
              {documentToReactComponents(item?.description)}
            </div>
            <a href={item?.link} key="go" rel="noreferrer" target="_blank">
              <Button type="primary">Click here</Button>
            </a>
          </div>
        </List.Item>
      )}
    />
  )
}

export const ContentListMini = ({
  content = [],
}: {
  content?: ContentfulContentCollectionFields[]
}) => {
  const communityCollection = content.find(
    (c) => c.collectionId === 'community'
  )
  const items = communityCollection?.content || []

  return (
    <List
      className="content-list-mini"
      dataSource={items}
      renderItem={(item) => (
        <List.Item>
          <a href={item?.link} key="go" rel="noreferrer" target="_blank">
            <div className="item">
              {item.title}
              <ArrowRightOutlined />
            </div>
          </a>
        </List.Item>
      )}
    />
  )
}
