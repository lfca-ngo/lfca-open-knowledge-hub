import { ArrowRightOutlined } from '@ant-design/icons'
import { List } from 'antd'

import { ContentListDefaultProps } from '.'
import styles from './styles.module.less'

export const ContentListMini = ({
  content = [],
  contentId,
}: ContentListDefaultProps) => {
  const communityCollection = content.find((c) => c.collectionId === contentId)
  const items = communityCollection?.content || []

  return (
    <List
      className={styles['content-list-mini']}
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
