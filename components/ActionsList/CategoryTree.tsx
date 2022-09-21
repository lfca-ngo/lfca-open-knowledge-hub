import { Checkbox } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'

import * as categoryTreeData from '../../next-fetch-during-build/data/_category-tree-data.json'
import { LookUpProps } from '../../services/contentful'
import { ShowMore } from '../ShowMore'
import { CategoryTreeElement } from './CategoryTreeElement'
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
  const { categoryTree } = categoryTreeData
  const lookUp: LookUpProps = categoryTreeData.lookUp

  const handleChange = (e: CheckboxChangeEvent, hasChildren: boolean) => {
    const name = e.target.name
    const checked = e.target.checked

    if (!name) return

    const parents = findCategoryParents(lookUp, name)
    const childrenArrays = findCategoryChildren(lookUp[name])
    const children = childrenArrays?.flat()

    // classical tree behaviour - parent and child nodes selection
    // has different consequences
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
    <div className="category-tree">
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
                    <div className="name">
                      {treeMetaData?.icon}
                      {tree.name}
                    </div>
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
