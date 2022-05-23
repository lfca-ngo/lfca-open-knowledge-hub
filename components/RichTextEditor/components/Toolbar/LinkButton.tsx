import { LinkOutlined } from '@ant-design/icons'
import { Button, Input, Popover } from 'antd'
import React from 'react'
import { NodeEntry } from 'slate'
import { useSlate } from 'slate-react'

import { isValidUrl } from '../../../../utils'
import { Link } from '../../types'
import {
  getEntryByTypeFromSelection,
  isBlockActiveWithinSelection,
  unwrapLink,
  wrapLink,
} from '../../utils'

interface LinkButtonProps {
  disabled: boolean
  format: Link['type']
}

export const LinkButton = ({ disabled, format }: LinkButtonProps) => {
  const [url, setUrl] = React.useState('')
  const [isPopoverVisible, setIsPopoverVisible] = React.useState(false)
  const [hasExistingLink, setHasExistingLink] = React.useState(false)
  const editor = useSlate()

  const isActive = isBlockActiveWithinSelection(editor, format)

  React.useEffect(() => {
    if (isPopoverVisible) {
      const linkEntry = getEntryByTypeFromSelection(
        editor,
        'link'
      ) as NodeEntry<Link>
      if (linkEntry) {
        const [linkNode] = linkEntry
        setUrl(linkNode?.url || '')
        setHasExistingLink(true)
      } else {
        setUrl('')
        setHasExistingLink(false)
      }
    }
  }, [editor, isPopoverVisible])

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
      getPopupContainer={(trigger) => trigger.parentElement || trigger}
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
        type={isActive ? 'primary' : 'default'}
      />
    </Popover>
  )

  function insertLink(url: string) {
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
