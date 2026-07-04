import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

const root = createRoot(document.getElementById('root'))

// ponytail: editor is dev-only. `import.meta.env.DEV` is statically false in
// `vite build`, so this whole branch (and Admin.jsx) is stripped from the
// production bundle Vercel serves — the deployed site is view-only.
if (import.meta.env.DEV) {
  // Reload only when crossing the #admin boundary — NOT on normal #home/#skills
  // navbar anchors, which must scroll without a reload.
  let wasAdmin = window.location.hash === '#admin'
  window.addEventListener('hashchange', () => {
    const isAdmin = window.location.hash === '#admin'
    if (isAdmin !== wasAdmin) window.location.reload()
    wasAdmin = isAdmin
  })

  if (window.location.hash === '#admin') {
    document.body.classList.add('editing') // plain bg, hides the portfolio backdrop
    const { default: Admin } = await import('./Admin.jsx')
    root.render(<StrictMode><Admin /></StrictMode>)
  } else {
    root.render(<StrictMode><App /></StrictMode>)
  }
} else {
  root.render(<StrictMode><App /></StrictMode>)
}
