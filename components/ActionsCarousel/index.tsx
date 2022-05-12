require('./styles.less')

import React from 'react'
import { Card, Carousel, Tag } from 'antd'
import { SM_BREAKPOINT } from '../../utils'
import { LogoGroup } from '../LogoGroup'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'

export const FAKE_LOGOS = [
    { logoUrl: 'https://via.placeholder.com/150' },
    { logoUrl: 'https://via.placeholder.com/150' },
    { logoUrl: 'https://via.placeholder.com/150' },
    { logoUrl: 'https://via.placeholder.com/150' },
]


export const ActionsCarousel = ({ actions, onSelect }: { actions: any, onSelect?: any }) => {

    const responsiveConfig = [
        {
            breakpoint: SM_BREAKPOINT,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        }
    ]

    return (
        <Carousel
            prevArrow={<ArrowLeftOutlined />}
            nextArrow={<ArrowRightOutlined />}
            className='actions-carousel'
            dots={false}
            responsive={responsiveConfig}
            slidesToScroll={3}
            slidesToShow={3}
        >
            {
                actions.map((action: any, i: any) => {
                    return (
                        <Card key={`action-${i}`}>
                            <Tag>Required</Tag>
                            <div className='action-card-content'>
                                <div className='action-card-title'>
                                    {action.title}
                                </div>
                                <LogoGroup data={FAKE_LOGOS} label={'doing this'} size="small" />
                            </div>
                        </Card>
                    )
                })
            }
        </Carousel >
    )
}