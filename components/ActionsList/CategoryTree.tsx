import { Col, Divider, Row, Checkbox } from 'antd'

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
          {tree.elements?.map(
            (
              element: ContentfulCategoryTreeFields | ContentfulCategoryFields,
              j
            ) => (
              <div key={`subtree-${j}`}>
                <Checkbox>{element.name}</Checkbox>

                {/* check if is tree? */}
              </div>
            )
          )}
        </Col>
      ))}
    </Row>
  )
}
