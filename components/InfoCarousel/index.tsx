import React, { useState, useRef } from "react"
import { Col, Row, Carousel, List } from "antd"
import Image from 'next/image'
require("./styles.less")

const CarouselNav = (props: any) => {
  const isIconString = typeof props.icon === "string"
  return (
    <List
      dataSource={props.elements}
      renderItem={(element: any, i) => (
        <List.Item
          className={`navigator-elem ${i === props.activeSlide ? "active" : ""
            } `}
          onClick={() => props.goTo(i)}
          onMouseOver={() => props.goTo(i)}
        >
          <div className="text">
            <div className="title">{element.title}</div>
            <div className="description">{element.description}</div>
          </div>
          <div className="icon">
            {isIconString ? (
              <img src={element.icon} alt="icon" />
            ) : (
              element.icon
            )}
          </div>
        </List.Item>
      )}
    />
  )
}

export const InfoCarousel = (props: any) => {
  const [activeSlide, setActiveSlide] = useState(0)
  const carouselEl: any = useRef()

  const goTo = (i: any) => {
    carouselEl.current.goTo(i)
  }

  return (
    <div className="info-carousel">
      <Row className="container-half">
        <Col xs={24} md={14}>
          <div className="has-max-width">
            <CarouselNav
              elements={props.elements}
              activeSlide={activeSlide}
              goTo={goTo}
            />
          </div>
        </Col>
        <Col xs={24} md={10}>
          <Carousel
            ref={carouselEl}
            beforeChange={(cur, next) => setActiveSlide(next)}
          >
            {props.elements.map((element: any, i: any) => {
              return <Image src={element.image} layout='responsive' width={300} height={225} />
            })}
          </Carousel>
        </Col>
      </Row>
    </div>
  )
}

export default InfoCarousel
