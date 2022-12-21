import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Collapse } from 'antd'

import { ContentfulRequirementFields } from '../../services/contentful'
import { options } from '../../utils/rich-text-options'

const { Panel } = Collapse

export const RequirementsItem = ({
  item,
}: {
  actionContentId: string
  item: ContentfulRequirementFields
}) => {
  return (
    <Collapse
      className="requirement-collapse mini-collapse"
      collapsible="header"
      ghost
    >
      <Panel header={item.title} key="1">
        <div className="requirement-text">
          <div className="description">
            {documentToReactComponents(item.howTo, options)}
          </div>
        </div>
      </Panel>
    </Collapse>
  )
}
