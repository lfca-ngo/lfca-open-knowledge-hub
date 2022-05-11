require('./styles.less')

import React from "react"
import { Button, Input, message } from "antd"
import { copyTextToClipboard } from "../../utils"


const CopyButton = (props: any) => {
  return (
    <Button
      type={props.type}
      block={props.block}
      icon="copy"
      size={props.size || "large"}
      onClick={props.handleCopy}
    >
      Copy
    </Button>
  )
}

export const CopyToClipboard = (props: any) => {
  const handleCopy = () => {
    copyTextToClipboard(props.text, (_: any, hasCopied: boolean) => {
      if (hasCopied) {
        message.success("Text copied to your clipboard!")
        props.onAfterCopy && props.onAfterCopy()
      } else message.error("Could not copy text")
    })
  }
  const MyButton = (
    <CopyButton
      type={props.type}
      size={props.size}
      block={props.block}
      handleCopy={handleCopy}
    >
      Copy
    </CopyButton>
  )
  return (
    <div className="copy-to-clipboard-btn">
      {props.hidePreview ? (
        MyButton
      ) : (
        <Input size="large" suffix={MyButton} value={props.text} disabled />
      )}
    </div>
  )
}
