import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from './styles.module.less'

const MENU_ITEMS = [
  { name: 'Actions', path: '/actions' },
  { name: 'Templates', path: '/templates' },
]

type CustomLinkProps = {
  children: React.ReactNode
  href: string
  className?: string
}

const CustomLink = ({ children, href }: CustomLinkProps) => {
  // get the active path using next/router
  const router = useRouter()
  const activePath = router.pathname
  const isActive = activePath === href

  return (
    <Link
      className={classNames(styles.customNavLink, {
        [styles.active]: isActive,
      })}
      href={href}
    >
      <a
        className={classNames(styles.customNavLink, {
          [styles.active]: isActive,
        })}
      >
        {children}
      </a>
    </Link>
  )
}

export const NavBar = () => {
  return (
    <nav className={styles.navBar}>
      <ul>
        {MENU_ITEMS.map((item) => (
          <li key={item.name}>
            <CustomLink href={item.path}>{item.name}</CustomLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
