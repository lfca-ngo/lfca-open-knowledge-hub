import {
  BoldOutlined,
  ItalicOutlined,
  LinkOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'
import { Button, Input, Popover } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSlate } from 'slate-react'

import { isValidUrl } from '../../../utils'
import {
  getEntryByTypeFromSelection,
  isBlockActiveWithinSelection,
  isMarkActiveWithinSelection,
  toggleBlock,
  toggleMark,
  unwrapLink,
  wrapLink,
} from '../utils'

const ButtonGroup = Button.Group

const BlockButton = ({ disabled, format, icon }) => {
  const editor = useSlate()
  return (
    <Button
      disabled={disabled}
      icon={icon}
      onMouseDown={(e) => {
        e.preventDefault()
        toggleBlock(editor, format)
      }}
      type={
        isBlockActiveWithinSelection(editor, format) ? 'primary' : 'secondary'
      }
    />
  )
}

const LinkButton = ({ disabled, format }) => {
  const [url, setUrl] = useState('')
  const [isPopoverVisible, setIsPopoverVisible] = useState(false)
  const [hasExistingLink, setHasExistingLink] = useState(false)
  const editor = useSlate()

  const isActive = isBlockActiveWithinSelection(editor, format)

  useEffect(() => {
    if (isPopoverVisible) {
      const linkEntry = getEntryByTypeFromSelection(editor, 'link')
      if (linkEntry) {
        const [linkNode] = linkEntry
        setUrl(linkNode?.url || '')
        setHasExistingLink(true)
      } else {
        setUrl('')
        setHasExistingLink(false)
      }
    }
  }, [isPopoverVisible])

  return (
    <Popover
      content={
        <div className="link-form">
          <Input
            className={!isValidUrl(url) ? 'error' : undefined}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                insertLink(url)
              }
            }}
            onPaste={(e) => {
              e.preventDefault()
              const pasted = e.clipboardData.getData('Text')
              if (pasted) {
                setUrl(pasted)
                insertLink(pasted)
              }
            }}
            placeholder="Paste link"
            value={url}
          />
          {hasExistingLink && (
            <Button onClick={removeLink} size="small" type="link">
              Remove link
            </Button>
          )}
        </div>
      }
      getPopupContainer={(trigger) => trigger.parentElement}
      onVisibleChange={setIsPopoverVisible}
      placement="bottom"
      trigger="click"
      visible={isPopoverVisible}
    >
      <Button
        disabled={disabled}
        icon={<LinkOutlined />}
        onMouseDown={(e) => {
          e.preventDefault()
        }}
        type={isActive ? 'primary' : 'secondary'}
      />
    </Popover>
  )

  function insertLink(url) {
    if (!isValidUrl(url)) {
      return
    }
    wrapLink(editor, url)
    setIsPopoverVisible(false)
    setUrl('')
  }

  function removeLink() {
    unwrapLink(editor)
    setIsPopoverVisible(false)
    setUrl('')
  }
}

const MarkButton = ({ disabled, format, icon }) => {
  const editor = useSlate()
  return (
    <Button
      disabled={disabled}
      icon={icon}
      onMouseDown={(e) => {
        e.preventDefault()
        toggleMark(editor, format)
      }}
      type={
        isMarkActiveWithinSelection(editor, format) ? 'primary' : 'secondary'
      }
    />
  )
}

export const Toolbar = ({ disabled }) => {
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
