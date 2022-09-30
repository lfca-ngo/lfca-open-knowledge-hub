import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  PieChartOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import { Alert, Button, Card, Carousel, Col, List, Modal, Row } from 'antd'
import React from 'react'

import { ArrowWrapper } from '../../components/ActionsCarousel/ArrowWrapper'
import { openInNewTab, toFixedNumber } from '../../utils'
import { CustomIcon } from './components/Category'
import { Footprint } from './components/Footprint'
import { ProgressBar } from './components/ProgressBar'
import { QuestionBlock } from './components/QuestionBlock'
import { OFFSETTING_PROVIDERS } from './data'
import styles from './styles.module.less'

const { confirm } = Modal

const showConfirm = (url: string) => {
  confirm({
    content:
      'Once you completed your carbon compensation, return to this page to finish your onboarding.',
    icon: <WarningOutlined />,
    okText: 'Open in new tab',
    onCancel() {
      // console.log('Cancel')
    },
    onOk() {
      openInNewTab(url)
    },
    title: "Before you leave: Don't forget to return!",
  })
}

export const CarbonCalculator = (props: any) => {
  const {
    activeAnswer,
    activeQuestion,
    answerQuestion,
    error,
    footprint = 0,
    goBack,
    loading,
    progress,
    reductionTips,
    saveResult,
  } = props

  const onFinish = () => {
    const roundedFootprint = toFixedNumber(footprint, 2)
    saveResult(roundedFootprint)
  }

  return (
    <div className="carbon-calculator">
      <ProgressBar progress={progress} />
      <div className="container">
        <Row>
          <Col className="main-container" md={18} xs={24}>
            {/* Show question block until last question reached */}
            {activeQuestion.id > -1 ? (
              <div>
                <QuestionBlock
                  activeAnswer={activeAnswer}
                  activeQuestion={activeQuestion}
                  goBack={goBack}
                  submit={answerQuestion}
                />
              </div>
            ) : (
              <div>
                {/* Show the test results */}
                <div className="category">
                  <PieChartOutlined />
                  Results
                </div>
                <h1>
                  {`Thanks! Understand how you can reduce your 
                  footprint. Click "save result" below to continue`}
                </h1>
                <p>
                  {`Here are a few tips on how to reduce your carbon footprint. We
                  will also send you a full list with all suggested measures via
                  e-mail.`}
                </p>
                <List
                  bordered
                  dataSource={reductionTips}
                  renderItem={(item: any) => (
                    <div className="custom-list-item">
                      <div className="icon">
                        <CustomIcon category={item.category} />
                      </div>
                      <div className="text">
                        <div className="title">{item.resultTitle}</div>
                        <p>{item.resultText}</p>
                      </div>
                    </div>
                  )}
                />
                <div className="offset-section">
                  <h3>{`Offset emissions that you can't reduce`}</h3>
                  <p>
                    {`While carbon offsetting does not replace reduction, it is an
                    essential step to reach global net 0 emissions. We can
                    recommend the following services:`}
                  </p>

                  <Carousel
                    arrows
                    className="provider-slider"
                    dots={false}
                    infinite={false}
                    nextArrow={<ArrowWrapper icon={<ArrowRightOutlined />} />}
                    prevArrow={<ArrowWrapper icon={<ArrowLeftOutlined />} />}
                    slidesToScroll={3}
                    slidesToShow={3}
                  >
                    {OFFSETTING_PROVIDERS.map((partner: any, i) => (
                      <Card
                        className="partner-sm"
                        extra={
                          <Button
                            ghost
                            onClick={() => showConfirm(partner.url)}
                            size="small"
                          >
                            Visit
                          </Button>
                        }
                        key={`partner-${i}`}
                        title={partner.name}
                      >
                        <img src={partner.logo} style={{ maxWidth: '100%' }} />
                      </Card>
                    ))}
                  </Carousel>
                </div>

                <Button
                  loading={loading}
                  onClick={onFinish}
                  size="large"
                  style={{ marginRight: '12px' }}
                  type="primary"
                >
                  Save result and continue
                </Button>

                <Button onClick={goBack} size="large" type="link">
                  Back
                </Button>

                {error && (
                  <Alert
                    message={error.message}
                    showIcon
                    style={{ margin: '15px 0' }}
                    type="error"
                  />
                )}
              </div>
            )}
          </Col>
          {/* Always show the current footprint on the side */}
          <Col className="side-container" md={6} xs={24}>
            <Footprint footprint={footprint} />
          </Col>
        </Row>
      </div>
    </div>
  )
}
