import { Button, Input, Popover } from "antd"
import React from "react"
import { useSlate } from "slate-react"

import {
  getEntryByTypeFromSelection,
  isBlockActiveWithinSelection,
  isMarkActiveWithinSelection,
  toggleBlock,
  toggleMark,
  unwrapLink,
  wrapLink,
} from "../utils"
import { isValidUrl } from "../../../utils"

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
        isBlockActiveWithinSelection(editor, format) ? "primary" : "secondary"
      }
    />
  )
}

const LinkButton = ({ disabled, format }) => {
  const [url, setUrl] = React.useState("")
  const [isPopoverVisible, setIsPopoverVisible] = React.useState(false)
  const [hasExistingLink, setHasExistingLink] = React.useState(false)
  const editor = useSlate()

  const isActive = isBlockActiveWithinSelection(editor, format)

  React.useEffect(() => {
    if (isPopoverVisible) {
      const linkEntry = getEntryByTypeFromSelection(editor, "link")
      if (linkEntry) {
        const [linkNode] = linkEntry
        setUrl(linkNode?.url || "")
        setHasExistingLink(true)
      } else {
        setUrl("")
        setHasExistingLink(false)
      }
    }
  }, [isPopoverVisible])

  return (
    <Popover
      content={
        <div className="link-form">
          <Input
            className={!isValidUrl(url) ? "error" : undefined}
            placeholder="Paste link"
            value={url}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                insertLink(url)
              }
            }}
            onPaste={(e) => {
              e.preventDefault()
              const pasted = e.clipboardData.getData("Text")
              if (pasted) {
                setUrl(pasted)
                insertLink(pasted)
              }
            }}
            onChange={(e) => setUrl(e.target.value)}
          />
          {hasExistingLink && (
            <Button type="link" size="small" onClick={removeLink}>
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
        icon="link"
        onMouseDown={(e) => {
          e.preventDefault()
        }}
        type={isActive ? "primary" : "secondary"}
      />
    </Popover>
  )

  function insertLink(url) {
    if (!isValidUrl(url)) {
      return
    }
    wrapLink(editor, url)
    setIsPopoverVisible(false)
    setUrl("")
  }

  function removeLink() {
    unwrapLink(editor)
    setIsPopoverVisible(false)
    setUrl("")
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
        isMarkActiveWithinSelection(editor, format) ? "primary" : "secondary"
      }
    />
  )
}

export const Toolbar = ({ disabled }) => {
  return (
    <div className="toolbar">
      <ButtonGroup>
        <MarkButton disabled={disabled} format="bold" icon="bold" />
        <MarkButton disabled={disabled} format="italic" icon="italic" />
      </ButtonGroup>
      <ButtonGroup>
        <LinkButton disabled={disabled} format="link" />
        <BlockButton
          disabled={disabled}
          format="bulleted-list"
          icon="unordered-list"
        />
        <BlockButton
          disabled={disabled}
          format="numbered-list"
          icon="ordered-list"
        />
      </ButtonGroup>
    </div>
  )
}
