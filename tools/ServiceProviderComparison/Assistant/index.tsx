require('./styles.less')

import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  MessageOutlined,
} from '@ant-design/icons'
import { Button, Carousel, Form, FormProps, Space } from 'antd'
import { CarouselRef } from 'antd/lib/carousel'
import { useRef, useState } from 'react'

import { MultiSelect } from '../../../components/MultiSelect'
import { ServiceProviderFragment } from '../../../services/lfca-backend'
import { getUniqueTags, PRICE_FILTER_OPTIONS } from '../utils'

export interface AssistantItems {
  services?: string[]
  supplyChainComplexity?: string[]
  models?: string[]
  cost?: number[][]
}

interface AssistantProps {
  form: FormProps['form']
  onValuesChange: (_: AssistantItems, allValues: AssistantItems) => void
  providers: ServiceProviderFragment[]
}

export const Assistant = ({
  form,
  onValuesChange,
  providers,
}: AssistantProps) => {
  const [activeSlide, setActiveSlide] = useState(0)
  const sliderRef = useRef<CarouselRef>(null)
  const serviceOptions = getUniqueTags(providers, 'services')
  const modelOptions = getUniqueTags(providers, 'model')
  const supplyChainComplexityOptions = getUniqueTags(
    providers,
    'supplyChainComplexity'
  )

  const prevSlide = () => {
    sliderRef.current?.goTo(activeSlide - 1)
  }

  const nextSlide = () => {
    sliderRef.current?.goTo(activeSlide + 1)
  }

  const formItems = [
    {
      component: (
        <Form.Item key="supply" name="supplyChainComplexity">
          <MultiSelect
            grouped={false}
            mode="single"
            options={supplyChainComplexityOptions.map((m) => ({
              key: m.name as string,
              label: m.name as string,
            }))}
          />
        </Form.Item>
      ),
      label: 'How complex is your supply chain?',
    },
    {
      component: (
        <Form.Item key="services" name="services">
          <MultiSelect
            grouped={false}
            options={serviceOptions.map((m) => ({
              key: m.name as string,
              label: m.name as string,
            }))}
          />
        </Form.Item>
      ),
      label: 'What kind of services do you need support with?',
    },
    {
      component: (
        <Form.Item key="models" name="models">
          <MultiSelect
            grouped={false}
            options={modelOptions.map((m) => ({
              key: m.name as string,
              label: m.name as string,
            }))}
          />
        </Form.Item>
      ),
      label: 'Which model will make most sense for you?',
    },
    {
      component: (
        <Form.Item key="cost" name="cost">
          <MultiSelect
            grouped={false}
            mode="single"
            options={PRICE_FILTER_OPTIONS}
          />
        </Form.Item>
      ),
      label: 'How much budget do you have?',
    },
  ]

  return (
    <Form
      className="assistant"
      form={form}
      layout="vertical"
      onValuesChange={onValuesChange}
    >
      <Carousel
        adaptiveHeight
        arrows={false}
        beforeChange={(_, next) => setActiveSlide(next)}
        dots={false}
        infinite
        ref={sliderRef}
        slidesToScroll={1}
        slidesToShow={1}
      >
        {formItems.map((item, i) => (
          <div key={i}>
            <div className="question">
              <div className="question-label">
                <MessageOutlined /> {item.label}
              </div>
            </div>
            {item.component}
            <Space>
              <Button
                disabled={activeSlide === 0}
                ghost
                icon={<ArrowLeftOutlined />}
                onClick={prevSlide}
              />

              <Button
                disabled={activeSlide >= formItems.length - 1}
                ghost
                icon={<ArrowRightOutlined />}
                onClick={nextSlide}
              />
            </Space>
          </div>
        ))}
      </Carousel>
    </Form>
  )
}
