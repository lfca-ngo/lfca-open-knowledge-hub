import { LinkOutlined } from '@ant-design/icons'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Button, Collapse } from 'antd'
import Image from 'next/image'

import { ContentListDefaultProps } from '.'
import styles from './styles.module.less'

const { Panel } = Collapse

export const ContentAccordion = ({
  content = [],
  contentId,
}: ContentListDefaultProps) => {
  const communityCollection = content.find((c) => c.collectionId === contentId)
  const items = communityCollection?.content || []

  return (
    <Collapse accordion className={styles['content-accordion']}>
      {items.map((item, i) => (
        <Panel header={item?.title} key={`faq-${i}`}>
          <div className="description">
            {documentToReactComponents(item?.description)}
          </div>
          {item?.preview && (
            <div className="image-wrapper">
              <Image
                alt="Community"
                layout="fill"
                objectFit="contain"
                src={item?.preview?.url}
              />
            </div>
          )}
          {item?.link && (
            <div className="btn-wrapper">
              <a href={item?.link}>
                <Button icon={<LinkOutlined />} type="primary">
                  Open link
                </Button>
              </a>
            </div>
          )}
        </Panel>
      ))}
    </Collapse>
  )
}
