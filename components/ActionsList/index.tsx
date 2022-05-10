require('./styles.less')

import React from 'react'
import { Tabs, List } from 'antd'
import { ActionCard } from '../ActionCard'
import { ALL_ACTIONS } from '../../services/contentful'

const { TabPane } = Tabs

export const ActionsList = ({ actionsByTags }: { actionsByTags: any }) => {
    return (
        <Tabs defaultActiveKey={ALL_ACTIONS}>
            {Object.keys(actionsByTags).map((tag: string) => {
                const actions = actionsByTags[tag]
                return (
                    <TabPane key={tag} tab={tag}>
                        <List
                            className="actions-list"
                            dataSource={actions}
                            pagination={{ pageSize: 10 }}
                            renderItem={(item: any) => {
                                return (
                                    <List.Item>
                                        <ActionCard action={item} />
                                    </List.Item>
                                )
                            }}
                        />
                    </TabPane>
                )
            })}
        </Tabs>
    )
}