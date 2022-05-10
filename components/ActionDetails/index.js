require('./styles.less')

import React from 'react'
import Image from 'next/image'
import { ActionStats } from '../ActionCard'

export const ActionDetails = ({ action }) => {
    return (
        <div className="action-details">
            <div className="action-title">
                <h1>{action?.title}</h1>
                <div className="hero">
                    <div className="wrapper">
                        <Image
                            layout="fill"
                            objectFit="cover"
                            src={action.heroImage.url}
                        />
                    </div>
                </div>
            </div>
            <ActionStats />
        </div >
    )
}