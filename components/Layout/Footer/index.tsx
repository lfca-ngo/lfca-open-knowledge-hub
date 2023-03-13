import styles from './styles.module.less'

const LINKS = [
  {
    key: 'Imprint',
    title: 'Imprint',
    url: 'https://lfca.ngo/de/imprint/',
  },
]

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.copyright}>
        {`lfca.ngo © ${new Date().getFullYear()} - No cookies, no worries 🍪`}
      </div>
      <div className={styles.licensing}>
        Except where otherwise noted, content on this site is licensed under a{' '}
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          rel="noreferrer"
          target="_blank"
        >
          Creative Commons Attribution 4.0 International
        </a>{' '}
        license.
      </div>
      <div className={styles.links}>
        <ul>
          {LINKS.map((link) => (
            <li key={link.key}>
              <a href={link.url} rel="noreferrer" target="_blank">
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
