require('./styles.less')

import { Button, ButtonProps } from 'antd'
import classNames from 'classnames'
import React from 'react'

export const ShowMore = ({
  buttonProps = { size: 'small' },
  maxHeight,
  text,
}: {
  buttonProps?: ButtonProps
  text: any
  maxHeight: number
}) => {
  const [isShowMoreVisible, setIsShowMoreVisible] = React.useState(false)
  const [isExpanded, setIsExpanded] = React.useState(false)
  const contentRef: any = React.createRef()

  React.useEffect(() => {
    const element: any = contentRef.current
    if (!element.return)
      setIsShowMoreVisible(element.scrollHeight > element.clientHeight)
  }, [contentRef])

  return (
    <div
      className={classNames('show-more', {
        'is-active': isShowMoreVisible,
        'is-expanded': isExpanded,
      })}
    >
      <div
        className="content"
        ref={contentRef}
        style={!isExpanded ? { maxHeight: maxHeight } : undefined}
      >
        {text}
      </div>

      {(isShowMoreVisible || isExpanded) && (
        <div className="show-more-button">
          <div
            className="fade-out"
            style={{
              opacity: isExpanded ? 0 : 1,
            }}
          />
          <Button onClick={() => setIsExpanded((v) => !v)} {...buttonProps}>
            {`show ${isExpanded ? 'less' : 'more'}`}
          </Button>
        </div>
      )}
    </div>
  )
}
