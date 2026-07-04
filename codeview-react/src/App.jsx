import { useEffect } from 'react'
import HeroThreeBG from './components/HeroThreeBG'
import useScrollReveal from './hooks/useScrollReveal'
import content from './content.json'
import './styles.css'

// Turn a section title into a stable anchor id ("My Awards" -> "my-awards")
const slug = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export default function App() {
  const { profile, skills, projects, socials } = content
  const sections = (content.sections || []).map((s, i) => ({ ...s, id: slug(s.title) || `section-${i}` }))

  // Collapse the mobile navbar after a link is tapped
  useEffect(() => {
    const links = document.querySelectorAll('.navbar-nav .nav-link')
    const close = () => {
      const navbar = document.getElementById('navbarNav')
      if (navbar?.classList.contains('show')) {
        document.querySelector('.navbar-toggler')?.click()
      }
    }
    links.forEach((l) => l.addEventListener('click', close))
    return () => links.forEach((l) => l.removeEventListener('click', close))
  }, [])

  useScrollReveal('.reveal')

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" aria-label="Main">
        <div className="container">
          <a className="navbar-brand" href="#home">CodeView</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link" href="#home">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="#skills">Skills</a></li>
              <li className="nav-item"><a className="nav-link" href="#works">Works</a></li>
              {sections.map((s) => (
                <li key={s.id} className="nav-item"><a className="nav-link" href={`#${s.id}`}>{s.title}</a></li>
              ))}
              <li className="nav-item"><a className="nav-link" href="#contact">Contacts</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section with Three.js background */}
      <section id="home" className="hero-section">
        <HeroThreeBG />
        <div className="container position-relative content-spacing">
          <div className="row align-items-center">
            <div className="col-lg-4 text-center mb-4 mb-lg-0">
              <img src={profile.image} alt={profile.name} className="img-fluid profile-pic" />
            </div>
            <div className="col-lg-8">
              <div className="text-panel">
                <h1 className="text-uppercase fw-bold fs-1 mb-3">
                  {profile.name}
                </h1>

                <h2 className="fs-5 fw-semibold mb-4">
                  {profile.subtitle}
                </h2>

                {profile.bio.map((para, i) => (
                  <p key={i} className={i === 0 ? 'lead mb-3' : undefined}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="content-spacing d-flex justify-content-center align-items-center vh-100 section-surface reveal"
      >
        <div className="d-block text-center">
          <h2 className="mb-4 text-white">My Current Skillset</h2>

          {/* Mark row as a stagger group */}
          <div className="row g-3 justify-content-center" data-sr="stagger">
            {skills.map(({ icon, label }) => (
              <div key={label} className="col-4 col-md-2 text-center reveal">
                <div className="skill-badge" title={label}>
                  <img src={icon} alt={label} className="skill-icon" loading="lazy" />
                  <span className="skill-label">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Works */}
      <section
        id="works"
        className="content-spacing d-flex justify-content-center align-items-center min-vh-100 section-surface reveal"
      >
        <div className="container">
          <h2 className="section-heading text-center text-white">My Works</h2>

          {/* Stagger the cards */}
          <div className="row g-4" data-sr="stagger">
            {projects.map(card => (
              <div key={card.title} className="col-12 col-md-6 col-lg-4 text-white reveal">
                <div className="project-card interactive">
                  <div className="thumb-wrap">
                    {card.href ? (
                      <a href={card.href} target="_blank" rel="noopener noreferrer">
                        <img src={card.img} alt={card.title} className="project-img" loading="lazy" />
                      </a>
                    ) : (
                      <img src={card.img} alt={card.title} className="project-img" loading="lazy" />
                    )}
                  </div>
                  <h5 className="text-center">{card.title}</h5>
                  <p>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom sections (added from the editor) */}
      {sections.map((s) => (
        <section
          key={s.id}
          id={s.id}
          className="content-spacing d-flex justify-content-center align-items-center min-vh-100 section-surface reveal"
        >
          <div className="container text-center text-white" style={{ maxWidth: 820 }}>
            <h2 className="section-heading text-white">{s.title}</h2>
            {s.image && (
              <img src={s.image} alt={s.title} className="project-img mb-4" style={{ maxWidth: 480, margin: '0 auto 1.5rem' }} loading="lazy" />
            )}
            {s.text && <p className="lead">{s.text}</p>}
            {(s.buttons || []).length > 0 && (
              <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
                {s.buttons.map((b, i) => (
                  <a key={i} href={b.href} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                    {b.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Footer */}
      <footer id="contact" className="bg-dark text-center text-light py-5 reveal">
        <div className="container">
          <h2 className="mb-4">Let&apos;s connect!</h2>
          <div className="row justify-content-center g-3 mb-4">
            {socials.map(({ href, icon, label, cls }) => (
              <div key={label} className="col-auto">
                <a href={href} target="_blank" rel="noopener noreferrer" className="text-decoration-none" aria-label={label}>
                  <img src={icon} alt={label} className={cls} />
                </a>
              </div>
            ))}
          </div>
          <p className="mb-0">CodeView &copy; 2025</p>
        </div>
      </footer>
    </div>
  )
}
