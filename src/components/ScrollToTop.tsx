import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisible = () => {
      setVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', toggleVisible, { passive: true })
    toggleVisible()

    return () => window.removeEventListener('scroll', toggleVisible)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-primary-500 text-white shadow-lg hover:bg-primary-600 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center cursor-pointer ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ArrowUp size={20} />
    </button>
  )
}

export default ScrollToTop
