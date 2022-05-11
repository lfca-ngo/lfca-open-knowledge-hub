import React from "react"
import { QuestionBlock } from "./components/QuestionBlock"
import { Footprint } from "./components/Footprint"
import { ProgressBar } from "./components/ProgressBar"
// import PartnerSelector from "../../components/PartnerSelector"
import { CustomIcon } from "./components/Category"
import { Row, Col, Button, List, Alert } from "antd"
import { PieChartOutlined } from '@ant-design/icons'
import { toFixedNumber } from "../../utils"
import "./styles.less"

export const CarbonCalculator = (props: any) => {
  const {
    activeQuestion,
    activeAnswer,
    reductionTips,
    answerQuestion,
    goBack,
    updateStatus,
    errorMessage,
    saveResult,
    progress,
    footprint = 0,
  } = props

  const onFinish = () => {
    const roundedFootprint = toFixedNumber(footprint, 2)
    saveResult(roundedFootprint)
  }

  return (
    <div className="carbon-calculator">
      <ProgressBar progress={progress} />
      <div className="container">
        <Row >
          <Col xs={24} md={18} className="main-container">
            {/* Show question block until last question reached */}
            {activeQuestion !== 'done?' ? (
              <div>
                <QuestionBlock
                  activeQuestion={activeQuestion}
                  activeAnswer={activeAnswer}
                  submit={answerQuestion}
                  goBack={goBack}
                />
              </div>
            ) : (
              <div>
                {/* Show the test results */}
                <div className="category">
                  Results
                  <PieChartOutlined />
                </div>
                <h1>Thanks! Here are some tips for you to reduce your carbon footprint. Please click "save result" below to continue</h1>
                <p>Here are a few tips on how to reduce your carbon footprint. We will also send you a full list with all suggested measures via e-mail.</p>
                <List
                  bordered
                  dataSource={reductionTips}
                  renderItem={(item: any) => (
                    <div className="custom-list-item">
                      <div className="icon">
                        <CustomIcon category={item.category} />
                      </div>
                      <div className="text">
                        <h5>{item.resultTitle}</h5>
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              item.resultText &&
                              item.resultText.childMarkdownRemark.html,
                          }}
                        />
                      </div>
                    </div>
                  )}
                />
                <div style={{ margin: "30px 0" }}>
                  <h3>Offset your carbon footprint</h3>
                  <p>
                    While carbon offsetting does not replace reduction, it is an
                    essential step to reach global net 0 emissions.
                  </p>
                  {/* <PartnerSelector slidesToShow={3} /> */}
                </div>

                <Button
                  style={{ marginRight: "12px" }}
                  size="large"
                  type="primary"
                  onClick={onFinish}
                  loading={updateStatus === 'BUSY'}
                >
                  Save result and continue
                </Button>

                <Button type="link" size="large" onClick={goBack}>
                  Back
                </Button>

                {updateStatus === "ERROR" && (
                  <Alert
                    style={{ margin: "15px 0" }}
                    showIcon
                    type="error"
                    message={errorMessage}
                  />
                )}
              </div>
            )}
          </Col>
          {/* Always show the current footprint on the side */}
          <Col xs={24} md={6} className="side-container">
            <Footprint footprint={footprint} />
          </Col>
        </Row>
      </div>
    </div>
  )
}
