import { Carousel, Col, List, Row } from 'antd'
import Image from 'next/image'
import React, { useRef, useState } from 'react'

import styles from './styles.module.less'

const CarouselNav = (props: any) => {
  const isIconString = typeof props.icon === 'string'
  return (
    <List
      dataSource={props.elements}
      renderItem={(element: any, i) => (
        <List.Item
          className={`navigator-elem ${
            i === props.activeSlide ? 'active' : ''
          } `}
          onClick={() => props.goTo(i)}
        >
          <div className="text">
            <div className="title">{element.title}</div>
            <div className="description">{element.description}</div>
          </div>
          <div className="icon">
            {isIconString ? (
              <img alt="icon" src={element.icon} />
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
    <div className={styles['info-carousel']}>
      <Row className="container-half">
        <Col md={14} xs={24}>
          <div className="has-max-width">
            <CarouselNav
              activeSlide={activeSlide}
              elements={props.elements}
              goTo={goTo}
            />
          </div>
        </Col>
        <Col md={10} xs={24}>
          <Carousel
            beforeChange={(cur, next) => setActiveSlide(next)}
            ref={carouselEl}
          >
            {props.elements.map((element: any, i: any) => {
              return (
                <Image
                  height={243}
                  key={`img-${i}`}
                  layout="responsive"
                  src={element.image}
                  width={300}
                />
              )
            })}
          </Carousel>
        </Col>
      </Row>
    </div>
  )
}

export default InfoCarousel
