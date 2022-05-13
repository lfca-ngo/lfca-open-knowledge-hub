require('./styles.less')

import { ArrowLeftOutlined, EllipsisOutlined } from '@ant-design/icons'
import { Button, Dropdown } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useScreenSize } from '../../../hooks/app'

const Menu = ({ nav }: { nav: any }) => {
  const router = useRouter()
  return (
    <ul className="top-nav">
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
  const screenSizeType = useScreenSize()
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
    if (screenSizeType === 'sm') {
      return (
        <Dropdown
          overlay={<Menu nav={nav} />}
          overlayClassName="top-nav-dropdown"
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
