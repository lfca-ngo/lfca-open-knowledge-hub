import { Checkbox, Col, Divider, Row } from 'antd'

import {
  ContentfulCategoryFields,
  ContentfulCategoryTreeFields,
} from '../../services/contentful'

export interface CategoryTreeProps {
  categoryTrees: ContentfulCategoryTreeFields[]
}

export const CategoryTree = ({ categoryTrees }: CategoryTreeProps) => {
  return (
    <Row>
      {categoryTrees.map((tree, i) => (
        <Col key={`tree-${i}`} xs={6}>
          {tree.name}
          <Divider />
          {tree.elements?.map((element, j) => (
            <div key={`subtree-${j}`}>
              <Checkbox>{element.name}</Checkbox>
              {'elements' in element &&
                element.elements?.map((subElement, k) => (
                  <div key={`sub-sub-tree-${k}`}>
                    * <Checkbox>{subElement.name}</Checkbox>
                  </div>
                ))}
            </div>
          ))}
        </Col>
      ))}
    </Row>
  )
}
