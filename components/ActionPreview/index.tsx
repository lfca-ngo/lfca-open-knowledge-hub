import { InfoCircleOutlined } from '@ant-design/icons'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Divider, Popover, Tag } from 'antd'
import { useState } from 'react'

import { ContentfulActionFields } from '../../services/contentful'
import { DEFAULT_FONT_SIZE, DEFAULT_LINE_HEIGHT } from '../../utils'
import { options } from '../../utils/rich-text-options'
import { Section } from '../Layout'
import { RequirementsListTabs } from '../RequirementsListTabs'
import { ShowMore } from '../ShowMore'
import styles from './styles.module.less'

interface ActionPreviewProps {
  actionContent: ContentfulActionFields
}

export const ActionPreview = ({ actionContent }: ActionPreviewProps) => {
  const [activeStatusTab, setActiveStatusTab] = useState<string | undefined>()

  return (
    <div className={styles['action-preview']}>
      <Popover content="You can view the entire module on your dashboard">
        <Tag className="super-text" icon={<InfoCircleOutlined />}>
          Module Summary
        </Tag>
      </Popover>

      <h1>{actionContent.title}</h1>

      <Section>
        <ShowMore
          buttonProps={{ type: 'link' }}
          maskMode="transparent"
          maxHeight={DEFAULT_FONT_SIZE * DEFAULT_LINE_HEIGHT * 4}
          text={
            actionContent?.aboutText &&
            documentToReactComponents(actionContent?.aboutText, options)
          }
        />
      </Section>

      <Divider />

      <Divider />
      <Section title="How To" titleSize="small">
        <RequirementsListTabs
          actionContent={actionContent}
          activeStatusTab={activeStatusTab}
          setActiveStatusTab={setActiveStatusTab}
        />
      </Section>
    </div>
  )
}
