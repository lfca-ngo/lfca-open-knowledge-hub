import styles from './styles.module.less'

interface WrapperProps {
  children: React.ReactNode
  style?: React.CSSProperties
}

export const Wrapper = ({ children, style }: WrapperProps) => {
  return (
    <div className={styles['wrapper']} style={style}>
      {children}
    </div>
  )
}
