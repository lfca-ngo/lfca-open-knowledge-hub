require('./styles.less')

import { LoadingOutlined } from '@ant-design/icons'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Checkbox, Collapse, List } from 'antd'

import { ContentfulRequirementFields } from '../../services/contentful'

const { Panel } = Collapse

export const RequirementsItem = ({
  item,
}: {
  item: ContentfulRequirementFields
}) => {
  const fetching = false
  const isDone = true

  const handleToggle = () => {
    // @TODO replace with logic
  }

  return (
    <Collapse className="requirement-collapse">
      <Panel
        extra={
          <div>
            {fetching ? (
              <LoadingOutlined />
            ) : (
              <Checkbox checked={isDone} onChange={handleToggle} />
            )}
          </div>
        }
        header={item.title}
        key="1"
      >
        <div className="requirement-text">
          <div className="description">
            {item.howTo && documentToReactComponents(item.howTo)}
          </div>
        </div>
      </Panel>
    </Collapse>
  )
}

export const RequirementsList = ({
  requirements,
}: {
  requirements: ContentfulRequirementFields[]
}) => {
  return (
    <List
      className="requirements-list"
      dataSource={requirements}
      renderItem={(item) => (
        <List.Item>
          <RequirementsItem item={item} />
        </List.Item>
      )}
    />
  )
}
