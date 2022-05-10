require('./styles.less')

import React, { useState, useRef } from "react"
import { Button, Checkbox } from "antd"
import SignatureCanvas from "react-signature-canvas"
import { CloseCircleFilled } from '@ant-design/icons'

const ChecklistElement = (props: any) => {
    return (
        <div className="checklist-element">
            <div className="checkbox">
                <Checkbox onClick={(e: any) => props.onToggle(e.target.checked)} />
            </div>
            <div className="content">
                <div className="title">{props.title}</div>
                <div className="text">{props.text}</div>
            </div>
        </div>
    )
}

const PLEDGE = (company: String) => [
    {
        title: "I personally commit to authentically leading the transformation",
        text: "I commit to using my personal influence to make my company's products and processes as sustainable as possible and lead the transformation wherever I can.",
    },
    {
        title: `At ${company} we commit to aligning our longterm business strategy with the Paris Accords`,
        text: "I commit that we will align our longterm strategy with the Paris agreement and build a business that contributes to the goal of global net 0.",
    },
    {
        title: `At ${company} we commit to yearly measurement of our carbon footprint (incl. Scope 3)`,
        text: "I acknowledge that to understand and reduce the real impact of our business we need to understand our carbon footprint including our value chain.",
    },
    {
        title: `At ${company} we commit to taking real impactful action`,
        text: "I acknowledge that it takes more than carbon reduction to stop the climate crisis. We are aware and ready to make our influence count with stakeholders such as partners, customers.",
    },
]

const initialState = new Array(PLEDGE('').length).fill(false)
const CANVAS_WIDTH = 300

export const Pledge = (props: any) => {
    const [checkboxes, setCheckboxes] = useState(initialState)
    const [hasSigned, setHasSigned] = useState(false)
    const [showClear, setShowClear] = useState(false)
    const isComplete = checkboxes.every((c) => c)
    const completeAndSigned = isComplete && hasSigned
    const signatureRef = useRef() as React.MutableRefObject<any>;

    const handleToggle = (i: any, checked: Boolean) => {
        const newState = [...checkboxes]
        newState[i] = checked
        setCheckboxes(newState)
    }

    const handleNext = () => {
        props.onFinish()
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
        const sig: any = signatureRef.current
        if (sig) {
            if (sig.isEmpty()) handleUndone()
            else handleDone()
        }
    }

    const clearSignature = () => {
        const sig: any = signatureRef.current
        if (sig) {
            sig.clear()
            handleUndone()
        }
    }

    return (
        <div className="pledge">
            {PLEDGE(props.companyName).map((el, i) => (
                <ChecklistElement
                    key={`pledge-${i}`}
                    checked={checkboxes[i]}
                    title={el.title}
                    text={el.text}
                    onToggle={(checked: Boolean) => handleToggle(i, checked)}
                />
            ))}

            <div className="signature-wrapper" style={{ width: `${CANVAS_WIDTH}px` }}>
                <SignatureCanvas
                    ref={signatureRef}
                    penColor="black"
                    onEnd={handleSignatureEnd}
                    canvasProps={{
                        width: CANVAS_WIDTH,
                        height: 100,
                        className: "sig-canvas",
                    }}
                />
                <div className="written-name">
                    {props.name}, {props.companyName}
                    <div className="btn-wrapper">
                        {showClear && (
                            <Button
                                icon={<CloseCircleFilled />}
                                onClick={clearSignature}
                                type="link"
                                size="small"
                            />
                        )}
                    </div>
                </div>
            </div>

            <Button
                disabled={!completeAndSigned}
                size="large"
                type="primary"
                onClick={handleNext}
            >
                Continue
            </Button>
        </div>
    )
}
