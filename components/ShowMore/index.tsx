import { Button, ButtonProps } from 'antd'
import classNames from 'classnames'
import React, { createRef, useState } from 'react'

import styles from './styles.module.less'

export const ShowMore = ({
  buttonProps = { size: 'small' },
  maxHeight,
  maskMode = 'blur',
  text,
}: {
  buttonProps?: ButtonProps
  text: any
  maxHeight: number
  maskMode?: 'transparent' | 'blur'
}) => {
  const [isInactive, setIsInactive] = useState(false)
  const [isShowMoreVisible, setIsShowMoreVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const contentRef: any = createRef()

  React.useEffect(() => {
    const element: any = contentRef.current

    if (!element.return)
      setIsShowMoreVisible(element.scrollHeight > element.clientHeight)

    // if the element size is smaller than the maxHeight, do not restrict size
    if (element.clientHeight < maxHeight) {
      setIsExpanded(true)
      setIsInactive(true)
    }
  }, [contentRef, maxHeight])

  return (
    <div
      className={classNames(styles['show-more'], maskMode, {
        'is-active': isShowMoreVisible,
        'is-expanded': isExpanded,
      })}
    >
      <div
        className="show-more-content"
        ref={contentRef}
        style={isExpanded ? undefined : { maxHeight: maxHeight }}
      >
        {text}
      </div>

      {isInactive
        ? null
        : (isShowMoreVisible || isExpanded) && (
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
