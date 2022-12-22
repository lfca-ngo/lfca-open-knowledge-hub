import { MenuFoldOutlined } from '@ant-design/icons'
import { Button, Drawer } from 'antd'
import { useState } from 'react'

import { useBreakpoints } from '../../hooks/useBreakpoints'
import styles from './styles.module.less'

interface CollapseDrawerProps {
  children: React.ReactNode
}

export const CollapseDrawer = ({ children }: CollapseDrawerProps) => {
  const [open, setOpen] = useState(false)
  const isDesktop = useBreakpoints().lg

  if (isDesktop) {
    return <div className={styles['collapse-drawer']}>{children}</div>
  } else {
    return (
      <>
        <Button
          className={styles['toggle-aside-btn']}
          icon={<MenuFoldOutlined />}
          onClick={() => setOpen(!open)}
        />

        <Drawer onClose={() => setOpen(false)} open={open}>
          {children}
        </Drawer>
      </>
    )
  }
}
