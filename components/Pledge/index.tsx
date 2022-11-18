import { CloseCircleFilled } from '@ant-design/icons'
import { Button, Checkbox } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import React, { useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'

import styles from './styles.module.less'

const ChecklistElement = ({
  checked,
  onToggle,
  text,
  title,
}: {
  checked: boolean
  onToggle: (checked: boolean) => void
  text: string
  title: string
}) => {
  return (
    <div className="checklist-element">
      <div className="checkbox">
        <Checkbox
          onChange={(e: CheckboxChangeEvent) => onToggle(e.target.checked)}
          value={checked}
        />
      </div>
      <div className="content">
        <div className="title">{title}</div>
        <div className="text">{text}</div>
      </div>
    </div>
  )
}

const PLEDGE = () => [
  {
    text: "I commit to using my personal influence to make my company's products and processes as sustainable as possible and lead the transformation wherever I can.",
    title: 'I personally commit to authentically leading the transformation',
  },
  {
    text: 'I commit that we will align our longterm strategy with the Paris agreement and build a business that contributes to the goal of global net 0.',
    title: `We commit to aligning our longterm business strategy with the Paris Accords`,
  },
  {
    text: 'I acknowledge that to understand and reduce the real impact of our business we need to understand our carbon emissions including our value chain.',
    title: `We commit to yearly measurement of our carbon emissions`,
  },
  {
    text: 'I acknowledge that it takes more than carbon reduction to stop the climate crisis. We are aware and ready to make our influence count with stakeholders such as partners, customers.',
    title: `We commit to taking real impactful action`,
  },
]

const initialState = new Array(PLEDGE().length).fill(false)
const CANVAS_WIDTH = 300

export const Pledge = ({
  name,
  onFinish,
}: {
  name?: string
  onFinish: () => void
}) => {
  const [checkboxes, setCheckboxes] = useState(initialState)
  const [hasSigned, setHasSigned] = useState(false)
  const [showClear, setShowClear] = useState(false)
  const isComplete = checkboxes.every((c) => c)
  const completeAndSigned = isComplete && hasSigned
  const signatureRef = useRef<SignatureCanvas>(null)

  const handleToggle = (i: any, checked: boolean) => {
    const newState = [...checkboxes]
    newState[i] = checked
    setCheckboxes(newState)
  }

  const handleNext = () => {
    onFinish()
  }

  const handleDone = () => {
    setShowClear(true)
    setHasSigned(true)
  }

  const handleUndone = () => {
    setShowClear(false)
    setHasSigned(false)
  }

  const handleSignatureEnd = () => {
    const sig = signatureRef.current
    if (sig) {
      if (sig.isEmpty()) handleUndone()
      else handleDone()
    }
  }

  const clearSignature = () => {
    const sig = signatureRef.current
    if (sig) {
      sig.clear()
      handleUndone()
    }
  }

  return (
    <div className={styles.pledge}>
      {PLEDGE().map((el, i) => (
        <ChecklistElement
          checked={checkboxes[i]}
          key={`pledge-${i}`}
          onToggle={(checked: boolean) => handleToggle(i, checked)}
          text={el.text}
          title={el.title}
        />
      ))}

      <div className="signature-wrapper" style={{ width: `${CANVAS_WIDTH}px` }}>
        <SignatureCanvas
          canvasProps={{
            className: 'sig-canvas',
            height: 100,
            width: CANVAS_WIDTH,
          }}
          onEnd={handleSignatureEnd}
          penColor="black"
          ref={signatureRef}
        />
        <div className="written-name">
          {name}
          <div className="btn-wrapper">
            {showClear && (
              <Button
                icon={<CloseCircleFilled />}
                onClick={clearSignature}
                size="small"
                type="link"
              />
            )}
          </div>
        </div>
      </div>

      <Button
        disabled={!completeAndSigned}
        onClick={handleNext}
        size="large"
        type="primary"
      >
        Continue
      </Button>
    </div>
  )
}
