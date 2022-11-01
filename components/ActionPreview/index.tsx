import { BulbOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Comment, Divider, Form, Popover, Tag } from 'antd'
import { useState } from 'react'

import { ContentfulActionFields } from '../../services/contentful'
import { CompanyActionListItemFragment } from '../../services/lfca-backend'
import { DEFAULT_FONT_SIZE, DEFAULT_LINE_HEIGHT } from '../../utils'
import { options } from '../../utils/richTextOptions'
import { StatusButton } from '../ActionBar/StatusButton'
import { Section } from '../Layout'
import { RequirementsListTabs } from '../RequirementsListTabs'
import { ShowMore } from '../ShowMore'
import styles from './styles.module.less'

interface ActionPreviewProps {
  action: CompanyActionListItemFragment
  actionContent: ContentfulActionFields
}

export const ActionPreview = ({
  action,
  actionContent,
}: ActionPreviewProps) => {
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

      <Form layout="vertical">
        <Form.Item
          label={
            <span>
              <Comment
                avatar={<BulbOutlined />}
                content={
                  'Tip: When marking an action as "Done", you can share your learnings, documents and best practices with the community'
                }
              />
            </span>
          }
        >
          <StatusButton action={action} />
        </Form.Item>
      </Form>

      <Divider />
      <Section title="How To" titleSize="small">
        <RequirementsListTabs
          action={action}
          actionContent={actionContent}
          activeStatusTab={activeStatusTab}
          setActiveStatusTab={setActiveStatusTab}
        />
      </Section>
    </div>
  )
}
