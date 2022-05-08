require('./styles.less')

import Link from 'next/link'
import { Button, Card, Avatar } from 'antd'
import { CheckOutlined, MessageFilled, PaperClipOutlined } from '@ant-design/icons'
import Image from 'next/image'
import classNames from 'classnames'

export const ActionStat = ({ count, label, icon, color }: { count: String, label: String, icon: any, color: String }) => {
    return (
        <div className={classNames('action-stat', color)}>
            <div className='icon'>
                <Avatar icon={icon} />
            </div>
            <div className='label'>
                <span className='count'>{count}</span>{' '}
                {label}
            </div>
        </div>
    )
}

export const ActionStats = () => {
    return (
        <div className='action-stats'>
            <ActionStat count={'821'} label='did that' icon={<CheckOutlined />} color='purple' />
            <ActionStat count={'121'} label='talking about it' icon={<MessageFilled />} color='orange' />
            <ActionStat count={'3'} label='documents' icon={<PaperClipOutlined />} color='green' />
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
                <ActionStats />
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