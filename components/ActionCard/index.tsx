require('./styles.less')

import Link from 'next/link'
import { Button, Card } from 'antd'
import { HomeFilled } from '@ant-design/icons'
import Image from 'next/image'


export const ActionStat = ({ count, label, icon }: { count: String, label: String, icon: String }) => {
    return (
        <div className='action-stat'>
            <div className='icon'>
                <HomeFilled />
            </div>
            <div className='label'>
                <span className='count'>{count}</span>
                {label}
            </div>
        </div>
    )
}

export const ActionCard = ({ action }: { action: any }) => {
    return (
        <Card hoverable className='action-card'>
            <div className='hero'>
                <div className='wrapper'>
                    <Image src={action.heroImage.url} objectFit='cover' layout='fill' />
                </div>
            </div>
            <div className='content'>
                <div className='title'>
                    {action.title}
                    <span className='tags'></span>
                </div>
                <div className='stats'>
                    <ActionStat count={'821'} label='Total' icon='home' />
                    <ActionStat count={'121'} label='Total' icon='home' />
                    <ActionStat count={'212'} label='Total' icon='home' />
                </div>
            </div>
            <div className='actions'>
                <div className='others'>
                    others
                </div>
                <Button type='primary'>
                    <Link href={`/action/${action.actionId}`}>
                        <a>View</a>
                    </Link>
                </Button>
            </div>
        </Card>
    )
}