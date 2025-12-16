import { useEffect } from 'react'

export default function useScrollReveal(selector = '.reveal', options = {}) {
  useEffect(() => {
    const all = document.querySelectorAll(selector)
    const groups = document.querySelectorAll('[data-sr="stagger"]')

    // Set per-item delays for any stagger groups
    groups.forEach(group => {
      const items = group.querySelectorAll(selector)
      items.forEach((el, i) => {
        el.style.setProperty('--sr-delay', `${Math.min(i * 90, 600)}ms`)
      })
    })

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.2, rootMargin: '0px 0px -10% 0px', ...options })

    all.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [selector, options])
}
