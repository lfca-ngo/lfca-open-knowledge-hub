import { Button, ButtonProps } from 'antd'
import classNames from 'classnames'
import React, { createRef, useState } from 'react'

import styles from './styles.module.less'

export const ShowMore = ({
  blurColor = '#fff',
  buttonProps = { size: 'small' },
  maxHeight,
  maskMode = 'blur',
  text,
}: {
  blurColor?: string
  buttonProps?: ButtonProps
  text: string | React.ReactNode
  maxHeight: number
  maskMode?: 'transparent' | 'blur'
}) => {
  const [isInactive, setIsInactive] = useState(false)
  const [isShowMoreVisible, setIsShowMoreVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const contentRef = createRef<HTMLDivElement>()

  React.useEffect(() => {
    const element = contentRef.current

    const clientHeight = element?.clientHeight || 0
    const scrollHeight = element?.scrollHeight || 0

    if (element) setIsShowMoreVisible(scrollHeight > clientHeight)

    // if the element size is smaller than the maxHeight, do not restrict size
    if (clientHeight < maxHeight) {
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
                  backgroundImage:
                    maskMode === 'blur'
                      ? `linear-gradient(
                    to bottom,
                    transparent,
                    ${blurColor}
                  )`
                      : 'none',
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
