require('./styles.less')

export const Footer = () => {
  return (
    <footer className="footer">{`lfca.earth © ${new Date().getFullYear()}`}</footer>
  )
}
