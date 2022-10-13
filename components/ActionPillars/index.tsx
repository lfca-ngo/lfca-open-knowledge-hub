import { List } from 'antd'
import classNames from 'classnames'

import categoryTreeData from '../../next-fetch-during-build/data/_category-tree-data.json'
import { rootTreeMetaData } from '../ActionsList/utils'
import styles from './styles.module.less'

const ActionPillar = ({
  color,
  description,
  icon,
  name,
}: {
  name: string
  description: string
  color: string
  icon: React.ReactNode
}) => {
  return (
    <div className={'action-pillar'}>
      <div className={classNames('icon-wrapper', color)}>{icon}</div>
      <div className="content">
        <div className="name">{name}</div>
        <div className="subtitle">{description}</div>
      </div>
    </div>
  )
}

export const ActionPillars = () => {
  const rootCategories = categoryTreeData.categoryTree.map((c) => ({
    ...c,
    elements: null,
  }))

  return (
    <div className={styles['action-pillars']}>
      <List
        dataSource={rootCategories}
        renderItem={(item) => {
          const meta = rootTreeMetaData[item.categoryId]
          return (
            <List.Item>
              <ActionPillar
                color={meta.color}
                description={meta.description}
                icon={meta.icon}
                name={item.name}
              />
            </List.Item>
          )
        }}
      />
    </div>
  )
}
