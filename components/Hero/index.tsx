import styles from './styles.module.less'

interface HeroProps {
  title: string
}

export const Hero = ({ title }: HeroProps) => {
  return (
    <div className={styles['hero']}>
      <h1>{title}</h1>
    </div>
  )
}
