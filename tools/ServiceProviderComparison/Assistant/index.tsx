import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  MessageOutlined,
} from '@ant-design/icons'
import { Button, Carousel, Form, FormProps, Space } from 'antd'
import { CarouselRef } from 'antd/lib/carousel'
import { useRef, useState } from 'react'

import { MultiSelect } from '../../../components/MultiSelect'
import {
  ServiceProviderFilterFragment,
  ServiceProviderFilterType,
  ServiceProviderFragment,
} from '../../../services/lfca-backend'
import { FilterFormItems } from '../FilterForm'
import { getFilterValues } from '../utils'
import styles from './styles.module.less'

interface AssistantProps {
  filters: ServiceProviderFilterFragment[]
  form: FormProps['form']
  onValuesChange: (_: FilterFormItems, allValues: FilterFormItems) => void
  providers: ServiceProviderFragment[]
}

export const Assistant = ({
  filters,
  form,
  onValuesChange,
  providers,
}: AssistantProps) => {
  const [activeSlide, setActiveSlide] = useState(0)
  const sliderRef = useRef<CarouselRef>(null)

  const prevSlide = () => {
    sliderRef.current?.goTo(activeSlide - 1)
  }

  const nextSlide = () => {
    sliderRef.current?.goTo(activeSlide + 1)
  }

  const renderInput = (filter: ServiceProviderFilterFragment) => {
    const possibleValues = getFilterValues(
      providers,
      filter.attribute as 'model' | 'services' | 'supplyChainComplexity',
      filter.values
    )

    return (
      <MultiSelect
        grouped={false}
        mode={
          filter.type === ServiceProviderFilterType.SELECT
            ? 'single'
            : 'multiple'
        }
        options={possibleValues.map((v) => ({
          help: v.help,
          key: v.key,
          label: v.label,
        }))}
      />
    )
  }

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
        {filters.map((filter) => (
          <div key={filter.id}>
            <div className="question">
              <div className="question-label">
                <MessageOutlined /> {filter.question || filter.label}
              </div>
            </div>
            <Form.Item label={filter.label} name={filter.attribute}>
              {renderInput(filter)}
            </Form.Item>
            <Space>
              <Button
                disabled={activeSlide === 0}
                ghost
                icon={<ArrowLeftOutlined />}
                onClick={prevSlide}
                shape="circle"
              />

              <Button
                disabled={activeSlide >= filters.length - 1}
                ghost
                icon={<ArrowRightOutlined />}
                onClick={nextSlide}
                shape="circle"
              />
            </Space>
          </div>
        ))}
      </Carousel>
    </Form>
  )
}
