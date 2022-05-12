require('./styles.less')

import { Button, Input, message } from 'antd'
import React from 'react'

import { copyTextToClipboard } from '../../utils'

const CopyButton = (props: any) => {
  return (
    <Button
      block={props.block}
      icon="copy"
      onClick={props.handleCopy}
      size={props.size || 'large'}
      type={props.type}
    >
      Copy
    </Button>
  )
}

export const CopyToClipboard = (props: any) => {
  const handleCopy = () => {
    copyTextToClipboard(props.text, (_: any, hasCopied: boolean) => {
      if (hasCopied) {
        message.success('Text copied to your clipboard!')
        props.onAfterCopy && props.onAfterCopy()
      } else message.error('Could not copy text')
    })
  }
  const MyButton = (
    <CopyButton
      block={props.block}
      handleCopy={handleCopy}
      size={props.size}
      type={props.type}
    >
      Copy
    </CopyButton>
  )
  return (
    <div className="copy-to-clipboard-btn">
      {props.hidePreview ? (
        MyButton
      ) : (
        <Input disabled size="large" suffix={MyButton} value={props.text} />
      )}
    </div>
  )
}
