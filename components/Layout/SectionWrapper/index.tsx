import { useEffect } from 'react'
import { IntersectionOptions, useInView } from 'react-intersection-observer'

export const scrollToId = (id: string) => {
  const section = document.querySelector(`#${id}`)
  section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

interface SectionWrapperProps {
  children: React.ReactNode
  id: string
  intersectionOptions?: IntersectionOptions
  setActiveNavItem: (key: string) => void
}

export const SectionWrapper = ({
  children,
  id,
  intersectionOptions,
  setActiveNavItem,
}: SectionWrapperProps) => {
  const { inView, ref } = useInView(intersectionOptions)

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
