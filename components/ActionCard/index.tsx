require('./styles.less')

import Link from 'next/link'
import { Button, Card, Avatar } from 'antd'
import { HomeFilled } from '@ant-design/icons'
import Image from 'next/image'


export const ActionStat = ({ count, label, icon }: { count: String, label: String, icon: String }) => {
    return (
        <div className='action-stat'>
            <div className='icon'>
                <Avatar size='small' icon={<HomeFilled />} />
            </div>
            <div className='label'>
                <span className='count'>{count}</span>{' '}
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
                    <ActionStat count={'821'} label='did that' icon='home' />
                    <ActionStat count={'121'} label='talking about it' icon='home' />
                    <ActionStat count={'3'} label='documents' icon='home' />
                </div>
            </div>
            <div className='actions'>
                <div className='others'>
                    <Avatar.Group>
                        <Avatar src={'https://picsum.photos/200/200'} />
                        <Avatar src={'https://picsum.photos/200/200'} />
                        <Avatar src={'https://picsum.photos/200/200'} />
                    </Avatar.Group>
                </div>
                <Link href={`/action/${action.actionId}`}>
                    <Button type='primary'>
                        View
                    </Button>
                </Link>
            </div>
        </Card>
    )
}