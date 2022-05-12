require('./styles.less')

import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const TopNav = ({ goBack, nav }: { nav: any; goBack: any }) => {
  const router = useRouter()
  const shouldRenderGoBack = goBack
  const shouldRenderNav = nav?.length > 0

  // go back button precedes list of nav items
  if (shouldRenderGoBack) {
    return (
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={goBack}
        style={{ color: 'black' }}
        type="link"
      >
        Back
      </Button>
    )
  }

  // render list of nav items
  if (shouldRenderNav) {
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
  return null
}
