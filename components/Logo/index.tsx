import classNames from 'classnames'
import { motion } from 'framer-motion'

import styles from './styles.module.less'

const DARK_COLOR = '#0b0b0c'
const LIGHT_COLOR = '#FBF7F0'
const SIZE_SM = 38
const SIZE_MD = 48
const SIZE_LG = 64

const variants = (theme: string) => ({
  animate: {
    strokeDashoffset: 0,
  },
  initial: {
    stroke: theme === 'dark' ? LIGHT_COLOR : DARK_COLOR,
    strokeDasharray: 1000,
    strokeDashoffset: 1000,
  },
})

interface LogoProps {
  animated?: boolean
  centered?: boolean
  size?: 'small' | 'medium' | 'large'
  theme?: 'light' | 'dark'
}

export const Logo = ({
  animated = false,
  centered = false,
  size = 'medium',
  theme = 'light',
}: LogoProps) => {
  const animationVariants = animated ? variants(theme) : {}
  const logoSize =
    size === 'small' ? SIZE_SM : size === 'medium' ? SIZE_MD : SIZE_LG

  return (
    <div
      className={classNames(styles['logo-wrapper'], size, theme, {
        centered,
      })}
    >
      <svg fill="none" height={logoSize} viewBox="0 0 239 239" width={logoSize}>
        <motion.path
          animate="animate"
          d="M94.0648 213.334C146.015 227.255 199.414 196.425 213.334 144.474C227.254 92.5235 196.425 39.1247 144.474 25.2046C92.5235 11.2845 39.1247 42.1143 25.2046 94.0649"
          initial="initial"
          stroke="#1E1C1C"
          strokeWidth="10"
          transition={{ delay: 1, duration: 3, ease: 'easeInOut' }}
          variants={animationVariants}
        />
        <motion.path
          animate="animate"
          d="M81.8393 185.28C118.113 206.223 164.497 193.795 185.44 157.521C206.382 121.247 193.954 74.8632 157.68 53.9203C121.406 32.9775 75.0225 45.4059 54.0797 81.68"
          initial="initial"
          stroke="#1E1C1C"
          strokeWidth="10"
          transition={{ delay: 0.5, duration: 3, ease: 'easeInOut' }}
          variants={animationVariants}
        />
        <motion.path
          animate="animate"
          d="M66.9623 133.728C74.7405 162.756 104.578 179.983 133.607 172.205C162.635 164.427 179.862 134.589 172.084 105.561C164.305 76.5322 134.468 59.3054 105.439 67.0836"
          initial="initial"
          stroke="#1E1C1C"
          strokeWidth="10"
          transition={{ delay: 0, duration: 3, ease: 'easeInOut' }}
          variants={animationVariants}
        />
      </svg>
    </div>
  )
}
