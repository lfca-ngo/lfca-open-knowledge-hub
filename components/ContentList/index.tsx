require('./styles.less')
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Button, Card, List } from 'antd'

import { ContentfulContentCollection } from '../../services/contentful'

export const ContentList = ({
  content = [],
}: {
  content?: ContentfulContentCollection[]
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
          <Card
            actions={[
              <a href={item?.link} key="go" rel="noreferrer" target="_blank">
                <Button type="primary">Click here</Button>
              </a>,
            ]}
            title={item.title}
          >
            {documentToReactComponents(item.description)}
          </Card>
        </List.Item>
      )}
    />
  )
}

export const ContentListMini = ({
  content = [],
}: {
  content?: ContentfulContentCollection[]
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
            {item.title}
          </a>
        </List.Item>
      )}
    />
  )
}
