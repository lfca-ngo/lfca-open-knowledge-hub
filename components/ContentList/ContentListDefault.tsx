import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Button, List } from 'antd'
import Image from 'next/image'

import { ContentListDefaultProps } from '.'
import styles from './styles.module.less'

export const ContentListDefault = ({
  content = [],
  contentId,
}: ContentListDefaultProps) => {
  const communityCollection = content.find((c) => c.collectionId === contentId)
  const items = communityCollection?.content || []

  return (
    <List
      className={styles['content-list']}
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
