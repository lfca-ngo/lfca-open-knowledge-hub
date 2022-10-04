import styles from './styles.module.less'

export const Footer = () => {
  return (
    <footer
      className={styles.footer}
    >{`lfca.earth © ${new Date().getFullYear()}`}</footer>
  )
}
