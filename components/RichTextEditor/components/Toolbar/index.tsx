import {
  BoldOutlined,
  ItalicOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'

import { BlockButton } from './BlockButton'
import { LinkButton } from './LinkButton'
import { MarkButton } from './MarkButton'

const ButtonGroup = Button.Group

interface ToolbarProps {
  disabled: boolean
}

export const Toolbar = ({ disabled }: ToolbarProps) => {
  return (
    <div className="toolbar">
      <ButtonGroup>
        <MarkButton disabled={disabled} format="bold" icon={<BoldOutlined />} />
        <MarkButton
          disabled={disabled}
          format="italic"
          icon={<ItalicOutlined />}
        />
        <LinkButton disabled={disabled} format="link" />
        <BlockButton
          disabled={disabled}
          format="bulleted-list"
          icon={<UnorderedListOutlined />}
        />
        <BlockButton
          disabled={disabled}
          format="numbered-list"
          icon={<OrderedListOutlined />}
        />
      </ButtonGroup>
    </div>
  )
}
