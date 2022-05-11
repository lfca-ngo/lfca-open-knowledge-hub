require('./styles.less')

import React from "react"
import { QuestionBlock } from "./components/QuestionBlock"
import { Footprint } from "./components/Footprint"
import { ProgressBar } from "./components/ProgressBar"
import { CustomIcon } from "./components/Category"
import { Row, Col, Button, List, Alert, Carousel, Card, Modal } from "antd"
import { PieChartOutlined, WarningOutlined, ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { toFixedNumber, openInNewTab } from "../../utils"
import { OFFSETTING_PROVIDERS } from './data'

const { confirm } = Modal

const showConfirm = (url: string) => {
  confirm({
    title: "Before you leave: Don't forget to return!",
    content:
      "Once you completed your carbon compensation, return to this page to finish your onboarding.",
    icon: <WarningOutlined />,
    okText: "Open in new tab",
    onOk() {
      openInNewTab(url)
    },
    onCancel() { },
  })
}

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
            {activeQuestion.id > -1 ? (
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
                  <PieChartOutlined />
                  Results
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
                        <p>{item.resultText}</p>
                      </div>
                    </div>
                  )}
                />
                <div className="offset-section">
                  <h3>Offset emissions that you can't reduce</h3>
                  <p>
                    While carbon offsetting does not replace reduction, it is an
                    essential step to reach global net 0 emissions. We can recommend the following services:
                  </p>

                  <Carousel
                    className="provider-slider"
                    slidesToShow={3}
                    infinite={false}
                    slidesToScroll={3}
                    arrows
                    dots={false}
                    prevArrow={<ArrowLeftOutlined />}
                    nextArrow={<ArrowRightOutlined />}
                  >
                    {OFFSETTING_PROVIDERS.map((partner: any, i) => (
                      <Card
                        title={partner.name}
                        className="partner-sm"
                        key={`partner-${i}`}
                        extra={
                          <Button
                            type="primary"
                            ghost
                            size="small"
                            onClick={() => showConfirm(partner.url)}
                          >
                            Visit
                          </Button>
                        }
                      >
                        <img style={{ maxWidth: '100%' }} src={partner.logo} />
                      </Card>
                    ))}
                  </Carousel>
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
