import { Checkbox, Col, Divider, Row } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { useState } from 'react'

import { CategoryTreesProps } from '../../services/contentful'
import { findCategoryAncestors, findCategoryChildren } from './utils'

export interface CategoryTreeProps {
  categoryTrees: CategoryTreesProps
  value?: string[]
  onChange?: (value: string[]) => void
}

export const CategoryTree = ({
  categoryTrees: categoryTreesStructure,
  value,
  onChange,
}: CategoryTreeProps) => {
  const { categoryTrees, lookUp } = categoryTreesStructure
  const [treeState, setTreeState] = useState<(string | null)[]>([])

  const handleChange = (e: CheckboxChangeEvent) => {
    const name = e.target.name
    const checked = e.target.checked

    if (!name) return

    const ancestors = findCategoryAncestors(lookUp, name)
    const childrenArrays = findCategoryChildren(lookUp[name])
    const children = childrenArrays?.flat()

    if (name.indexOf('tree-') > -1) {
      // if checked element is tree parent => get all children and childrens children
      const withChildren = [...children, name]
      if (checked) {
        // mark also all children
        const withPreviousState = [...treeState, ...withChildren]

        setTreeState(withPreviousState)
      } else {
        // remove all children
        const withoutChildren = treeState.filter(
          (i) => withChildren.indexOf(i) < 0
        )
        setTreeState(withoutChildren)
      }
    } else {
      if (checked) {
        // ancestors MUST be included when child is selected
        const withAncestors = [...ancestors, name]
        const withPreviousState = [...treeState, ...withAncestors]

        setTreeState(withPreviousState.filter((v, i, s) => s.indexOf(v) === i))
      } else {
        // remove the single item from state
        const withoutItem = treeState.filter((i) => i !== name)
        setTreeState(withoutItem)
      }
    }
  }

  return (
    <Row>
      {categoryTrees.map((tree, i) => (
        <Col key={`tree-${i}`} xs={6}>
          <Checkbox
            checked={treeState?.indexOf(tree.categoryId) > -1}
            name={tree.categoryId}
            onChange={handleChange}
          >
            {tree.name}
          </Checkbox>
          {/* 
            1. When a child is selected, the parents must be selected as well
            2. When a parent is selected or unselected, the operation must apply to all children
          */}
          <Divider />
          {tree.elements?.map((element, j) => (
            <div key={`subtree-${j}`}>
              <Checkbox
                checked={treeState?.indexOf(element.categoryId) > -1}
                name={element.categoryId}
                onChange={handleChange}
              >
                {element.name}
              </Checkbox>
              {'elements' in element &&
                element.elements?.map((subElement, k) => (
                  <div key={`sub-sub-tree-${k}`}>
                    *{' '}
                    <Checkbox
                      checked={treeState?.indexOf(subElement.categoryId) > -1}
                      name={subElement.categoryId}
                      onChange={handleChange}
                    >
                      {subElement.name}
                    </Checkbox>
                  </div>
                ))}
            </div>
          ))}
        </Col>
      ))}
    </Row>
  )
}
