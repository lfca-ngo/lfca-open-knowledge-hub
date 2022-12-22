import { AppstoreAddOutlined } from '@ant-design/icons'
import { Button, Drawer } from 'antd'
import classNames from 'classnames'
import { useState } from 'react'

import { useBreakpoints } from '../../../hooks/useBreakpoints'
import { AsidePosition } from '.'
import styles from './styles.module.less'

interface AsideProps {
  children: React.ReactNode
  asidePosition: AsidePosition
  stickySidebar?: boolean
}

export const Aside = ({
  asidePosition,
  children,
  stickySidebar = false,
}: AsideProps) => {
  const [open, setOpen] = useState(false)
  const isDesktop = useBreakpoints().lg

  if (isDesktop) {
    return (
      <aside
        className={classNames(styles['aside'], styles[`${asidePosition}`], {
          [styles['sticky-sidebar']]: stickySidebar,
        })}
      >
        {children}
      </aside>
    )
  } else {
    return (
      <>
        <Button
          className={styles['toggle-aside-btn']}
          icon={<AppstoreAddOutlined />}
          onClick={() => setOpen(!open)}
        />

        <Drawer onClose={() => setOpen(false)} open={open}>
          {children}
        </Drawer>
      </>
    )
  }
}
