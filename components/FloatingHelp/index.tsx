import { MessageFilled } from '@ant-design/icons'
import { Button, Popover } from 'antd'

import { DEFAULT_SUPPORT_EMAIL } from '../../utils'
import styles from './styles.module.less'

export const FloatingHelp = () => {
  return (
    <div className={styles['floating-help']}>
      <Popover content="Questions?" placement="left">
        <a href={`mailto:${DEFAULT_SUPPORT_EMAIL}`}>
          <Button icon={<MessageFilled />} shape="round" size="large" />
        </a>
      </Popover>
    </div>
  )
}
