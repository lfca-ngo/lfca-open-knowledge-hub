import { Checkbox, Popover } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'

import categoryTreeData from '../../public/data/_category-tree-data.json'
import {
  ContentfulCategoryTreeFields,
  LookUpProps,
} from '../../services/contentful'
import { ShowMore } from '../ShowMore'
import { CategoryTreeElement } from './CategoryTreeElement'
import styles from './styles.module.less'
import {
  findCategoryChildren,
  findCategoryParents,
  rootTreeMetaData,
} from './utils'

export interface CategoryTreeComponentProps {
  value?: string[]
  onChange?: (value: string[]) => void
}

export const CategoryTreeComponent = ({
  value = [],
  onChange,
}: CategoryTreeComponentProps) => {
  const lookUp: LookUpProps = categoryTreeData.lookUp
  const categoryTree: ContentfulCategoryTreeFields[] =
    categoryTreeData.categoryTree.sort((a, b) => {
      if (a.sortWeight < b.sortWeight) return -1
      if (a.sortWeight > b.sortWeight) return 1
      return 0
    }) || []

  const handleChange = (e: CheckboxChangeEvent, hasChildren: boolean) => {
    const name = e.target.name
    const checked = e.target.checked

    if (!name) return

    const parents = findCategoryParents(lookUp, name)
    const childrenArrays = findCategoryChildren(lookUp[name])
    const children = childrenArrays?.flat()

    // classical tree behaviour - parent and child nodes selection
    if (hasChildren) {
      // if checked element is a parent node => perform operations
      // for all children and childrens children as well
      const withChildren = [...children, name]
      if (checked) {
        // mark all children and the parents, keep previous state in place
        const withPreviousState = [...value, ...withChildren, ...parents]

        return onChange?.(withPreviousState)
      } else {
        // remove all children
        const withoutChildren = value.filter((i) => withChildren.indexOf(i) < 0)
        return onChange?.(withoutChildren)
      }
    } else {
      // if checked element is a child node (=category), we need to make
      // sure that the parents are also considered in actions
      if (checked) {
        // parents MUST be included when child is selected
        const withParents = [...parents, name]
        const withPreviousState = [...value, ...withParents]

        return onChange?.(
          withPreviousState.filter((v, i, s) => s.indexOf(v) === i)
        )
      } else {
        // remove the single item from state
        const withoutItem = value.filter((i) => i !== name)
        return onChange?.(withoutItem)
      }
    }
  }

  return (
    <div className={styles['category-tree']}>
      {categoryTree.map((tree, i) => {
        const treeMetaData = rootTreeMetaData[tree.categoryId]
        return (
          <div className={`tree-col ${treeMetaData.color}`} key={`tree-${i}`}>
            <ShowMore
              buttonProps={{ block: true, size: 'small' }}
              maxHeight={180}
              text={
                <>
                  <Checkbox
                    checked={value?.indexOf(tree.categoryId) > -1}
                    className={'main-tree-checkbox'}
                    name={tree.categoryId}
                    onChange={(e) => handleChange(e, 'elements' in tree)}
                  >
                    <Popover
                      content={treeMetaData.description}
                      overlayClassName="popover-md"
                      title={tree.name}
                    >
                      <div className="name">
                        {treeMetaData?.icon}
                        {tree.name}
                      </div>
                    </Popover>
                  </Checkbox>

                  {tree.elements?.map((element, j) => (
                    <CategoryTreeElement
                      element={element}
                      handleChange={handleChange}
                      key={`subtree-${j}`}
                      value={value}
                    />
                  ))}
                </>
              }
            />
          </div>
        )
      })}
    </div>
  )
}
