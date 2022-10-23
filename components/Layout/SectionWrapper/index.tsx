import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

export const scrollToId = (id: string) => {
  const section = document.querySelector(`#${id}`)
  section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

interface SectionWrapperProps {
  children: React.ReactNode
  id: string
  setActiveNavItem: (key: string) => void
}

export const SectionWrapper = ({
  children,
  id,
  setActiveNavItem,
}: SectionWrapperProps) => {
  const { inView, ref } = useInView({ threshold: 0.3 })

  useEffect(() => {
    if (inView) {
      setActiveNavItem(id)
    }
  }, [inView, setActiveNavItem, id])

  return (
    <section className="section-wrapper" id={id} ref={ref}>
      {children}
    </section>
  )
}
