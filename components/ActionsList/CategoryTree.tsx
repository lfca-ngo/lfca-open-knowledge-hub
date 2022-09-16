import { Checkbox } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'

import { CategoryTreesProps } from '../../services/contentful'
import { ShowMore } from '../ShowMore'
import { CategoryTreeElement } from './CategoryTreeElement'
import {
  findCategoryAncestors,
  findCategoryChildren,
  mainTreeMetaData,
} from './utils'

export interface CategoryTreeProps {
  categoryTrees: CategoryTreesProps
  value?: string[]
  onChange?: (value: string[]) => void
}

export const CategoryTree = ({
  categoryTrees: categoryTreesStructure,
  value = [],
  onChange,
}: CategoryTreeProps) => {
  const { categoryTrees, lookUp } = categoryTreesStructure

  const handleChange = (e: CheckboxChangeEvent, hasChildren: boolean) => {
    const name = e.target.name
    const checked = e.target.checked

    if (!name) return

    const ancestors = findCategoryAncestors(lookUp, name)
    const childrenArrays = findCategoryChildren(lookUp[name])
    const children = childrenArrays?.flat()

    if (hasChildren) {
      // if checked element is tree parent => get all children and childrens children
      const withChildren = [...children, name]
      if (checked) {
        // mark also all children and the parents
        const withPreviousState = [...value, ...withChildren, ...ancestors]

        return onChange?.(withPreviousState)
      } else {
        // remove all children
        const withoutChildren = value.filter((i) => withChildren.indexOf(i) < 0)
        return onChange?.(withoutChildren)
      }
    } else {
      if (checked) {
        // ancestors MUST be included when child is selected
        const withAncestors = [...ancestors, name]
        const withPreviousState = [...value, ...withAncestors]

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
      {categoryTrees.map((tree, i) => {
        const treeMetaData = mainTreeMetaData[tree.categoryId]
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
