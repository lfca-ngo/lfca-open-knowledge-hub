import { DownOutlined } from '@ant-design/icons'
import { Button, Checkbox } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { useState } from 'react'

import {
  ContentfulCategoryFields,
  ContentfulCategoryTreeFields,
} from '../../services/contentful'

export interface CategoryTreeElementProps {
  element: ContentfulCategoryTreeFields | ContentfulCategoryFields
  handleChange: (e: CheckboxChangeEvent, hasChildren: boolean) => void
  value: string[]
}

export const CategoryTreeElement = ({
  element,
  handleChange,
  value = [],
}: CategoryTreeElementProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <div>
      <Checkbox
        checked={value?.indexOf(element.categoryId) > -1}
        className="sub-tree-checkbox"
        name={element.categoryId}
        onChange={(e) => handleChange(e, 'elements' in element)}
      >
        <span className="text">{element.name}</span>

        {'elements' in element && (
          <Button
            icon={
              <DownOutlined style={{ rotate: isOpen ? '180deg' : '0deg' }} />
            }
            onClick={toggle}
            size="small"
            type="link"
          />
        )}
      </Checkbox>

      {isOpen &&
        'elements' in element &&
        element.elements?.map((subElement, k) => (
          <div key={`sub-sub-tree-${k}`}>
            <Checkbox
              checked={value?.indexOf(subElement.categoryId) > -1}
              className="sub-sub-tree-checkbox"
              name={subElement.categoryId}
              onChange={(e) => handleChange(e, 'elements' in subElement)}
            >
              {subElement.name}
            </Checkbox>
          </div>
        ))}
    </div>
  )
}
