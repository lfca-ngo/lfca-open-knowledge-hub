import styles from './styles.module.less'

export const Footer = () => {
  return (
    <div
      className={styles.footer}
    >{`lfca.earth © ${new Date().getFullYear()}`}</div>
  )
}
