import { Carousel, Col, List, Row } from 'antd'
import { CarouselRef } from 'antd/lib/carousel'
import Image from 'next/image'
import React, { useRef, useState } from 'react'

import { CarouselElementProps } from '../Flows/OnboardingOfficer'
import styles from './styles.module.less'

const CarouselNav = ({
  activeSlide,
  elements,
  goTo,
}: {
  activeSlide: number
  elements: CarouselElementProps[]
  goTo: (i: number) => void
}) => {
  return (
    <List
      dataSource={elements}
      renderItem={(element, i) => (
        <List.Item
          className={`navigator-elem ${i === activeSlide ? 'active' : ''} `}
          onClick={() => goTo(i)}
        >
          <div className="text">
            <div className="title">{element.title}</div>
            <div className="description">{element.description}</div>
          </div>
          <div className="icon">
            {typeof element.icon === 'string' ? (
              // eslint-disable-next-line @next/next/no-img-element
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

export const InfoCarousel = ({
  elements,
}: {
  elements: CarouselElementProps[]
}) => {
  const [activeSlide, setActiveSlide] = useState(0)
  const carouselEl = useRef<CarouselRef>(null)

  const goTo = (i: number) => {
    carouselEl?.current?.goTo?.(i)
  }

  return (
    <div className={styles['info-carousel']}>
      <Row className="container-half">
        <Col md={14} xs={24}>
          <div className="has-max-width">
            <CarouselNav
              activeSlide={activeSlide}
              elements={elements}
              goTo={goTo}
            />
          </div>
        </Col>
        <Col md={10} xs={24}>
          <Carousel
            beforeChange={(cur, next) => setActiveSlide(next)}
            ref={carouselEl}
          >
            {elements.map((element, i) => {
              return (
                <Image
                  alt={element.title}
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
