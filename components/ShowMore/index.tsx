require('./styles.less')

import { Button } from 'antd'
import React from 'react'

export const ShowMore = ({
  maxHeight,
  size = 'small',
  text,
}: {
  size?: 'small'
  text: any
  maxHeight: any
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
    <div className="show-more">
      <div
        className="content"
        ref={contentRef}
        style={!isExpanded ? { maxHeight: maxHeight } : undefined}
      >
        {text}
      </div>

      {(isShowMoreVisible || isExpanded) && (
        <div className="show-more">
          <div
            className="fade-out"
            style={{
              opacity: isExpanded ? 0 : 1,
            }}
          />
          <Button onClick={() => setIsExpanded((v) => !v)} size={size}>
            {`show ${isExpanded ? 'less' : 'more'}`}
          </Button>
        </div>
      )}
    </div>
  )
}
