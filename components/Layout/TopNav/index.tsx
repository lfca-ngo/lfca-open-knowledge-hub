import { ArrowLeftOutlined, EllipsisOutlined } from '@ant-design/icons'
import { Button, Dropdown, Grid } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'

const { useBreakpoint } = Grid

import styles from './styles.module.less'

const Menu = ({ nav }: { nav: any }) => {
  const router = useRouter()
  return (
    <ul className={styles['top-nav']}>
      {nav.map((item: any, i: any) => (
        <li key={`item-${i}`}>
          <Link href={item.path}>
            <Button type={router.pathname === item.path ? 'default' : 'link'}>
              {item.title}
            </Button>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export const TopNav = ({ goBack, nav }: { nav: any; goBack: any }) => {
  const isDesktop = useBreakpoint().md
  const shouldRenderGoBack = goBack
  const shouldRenderNav = nav?.length > 0

  // go back button precedes list of nav items
  if (shouldRenderGoBack) {
    return (
      <Button icon={<ArrowLeftOutlined />} onClick={goBack}>
        Back
      </Button>
    )
  }

  // render list of nav items
  if (shouldRenderNav) {
    // on mobile render menu in dropdown
    if (!isDesktop) {
      return (
        <Dropdown
          overlay={<Menu nav={nav} />}
          overlayClassName={styles['top-nav-dropdown']}
        >
          <Button icon={<EllipsisOutlined />} />
        </Dropdown>
      )
    }

    // on desktop in full
    return <Menu nav={nav} />
  }
  return null
}
