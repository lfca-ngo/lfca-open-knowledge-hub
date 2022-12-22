import { ArrowLeftOutlined, EllipsisOutlined } from '@ant-design/icons'
import { Button, Dropdown } from 'antd'
import { MenuItemType } from 'antd/lib/menu/hooks/useItems'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useBreakpoints } from '../../../hooks/useBreakpoints'
import styles from './styles.module.less'

const Menu = ({ nav }: { nav: MenuItemType[] }) => {
  const router = useRouter()

  return (
    <ul className={styles['top-nav']}>
      {nav.map((item, i) => {
        return (
          <li
            className={router.pathname == `${item.key}` ? 'active' : ''}
            key={`item-${i}`}
          >
            <Link href={`${item.key}`}>{item.label}</Link>
          </li>
        )
      })}
    </ul>
  )
}

export const TopNav = ({
  goBack,
  nav,
}: {
  nav?: MenuItemType[]
  goBack?: () => void
}) => {
  const isDesktop = useBreakpoints().md
  const shouldRenderGoBack = !!goBack
  const shouldRenderNav = !!nav

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
