import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { Carousel, CarouselProps } from 'antd'

import { ContentfulSourceFields } from '../../services/contentful'
import { LAYOUT_BREAKPOINTS } from '../../utils'
import { EmptyState } from '../EmptyState'
import { SourcesCard } from '../SourcesCard'
import styles from './styles.module.less'

interface SourcesCarouselProps {
  sources: ContentfulSourceFields[]
  fetching?: boolean
  cardType?: 'default'
  carouselProps?: CarouselProps
}

export const SourcesCarousel = ({
  cardType = 'default',
  sources,
  fetching,
  carouselProps = {
    responsive: [
      {
        breakpoint:
          LAYOUT_BREAKPOINTS.find((l) => l.name === 'sm')?.minWidth || 0,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 1,
        },
      },
      {
        breakpoint:
          LAYOUT_BREAKPOINTS.find((l) => l.name === 'xl')?.minWidth || 0,
        settings: {
          slidesToScroll: 2,
          slidesToShow: 2,
        },
      },
    ],
    slidesToScroll: 3,
    slidesToShow: 3,
  },
}: SourcesCarouselProps) => {
  if (sources.length === 0 && !fetching)
    return <EmptyState text="Empty" title="No sources found" />

  return (
    <Carousel
      arrows={true}
      className={styles.sourcesCarousel}
      dots={false}
      infinite={false}
      nextArrow={<ArrowRightOutlined />}
      prevArrow={<ArrowLeftOutlined />}
      {...carouselProps}
    >
      {(sources.length === 0 ? [] : sources).map((template) => {
        switch (cardType) {
          default:
            return <SourcesCard fetching={fetching} item={template} />
        }
      })}
    </Carousel>
  )
}
