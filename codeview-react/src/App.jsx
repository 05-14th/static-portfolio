import { useEffect } from 'react'
import HeroThreeBG from './components/HeroThreeBG'
import useScrollReveal from './hooks/useScrollReveal'
import './styles.css'

const SKILLS = [
  ['/images/icons/php.svg', 'PHP'],
  ['/images/icons/python.svg', 'Python'],
  ['/images/icons/csharp.svg', 'C#'],
  ['/images/icons/vbnet.svg', 'VB.NET'],
  ['/images/icons/javascript.svg', 'JavaScript'],
  ['/images/icons/typescript.svg', 'TypeScript'],
  ['/images/icons/react.svg', 'React'],
  ['/images/icons/bootstrap.svg', 'Bootstrap'],
  ['/images/icons/tailwind.svg', 'Tailwind'],
  ['/images/icons/mysql.svg', 'MySQL'],
  ['/images/icons/mongodb.svg', 'MongoDB'],
  ['/images/icons/android.svg', 'Android'],
  ['/images/icons/firebase.svg', 'Firebase'],
  ['/images/icons/godot.svg', 'Godot'],
]

const WORKS = [
  {
    href: 'https://youtu.be/NiuGTn1yQ-k?si=CBiQFNwja7SIThWX',
    img: '/images/olsmg.png',
    title: 'Transaction Recording System',
    desc: 'A VB.NET-powered point-of-sale solution that streamlines product transactions through automatic computations, instant receipt printing, and an intuitive cashier-friendly interface — cutting down manual entry errors and boosting store recording efficiency by 30%. Built with VB.NET and MySQL.'
  },
  {
    href: 'https://github.com/05-14th/Medical_Recording_System',
    img: '/images/mediweb.png',
    title: 'Medical Recording Web App',
    desc: 'A PHP-based web platform that digitizes patient profiles, prescriptions, and visit histories with a clean input-output workflow — replacing tedious paper-based logs and improving medical recording efficiency by 50%. Built with PHP, MySQL, JavaScript, and Bootstrap.'
  },
  {
    href: '',
    img: '/images/image.png',
    title: 'Thriveway MSP Cloud',
    desc: 'A multi-tenant cloud platform that automates Microsoft 365 mailbox provisioning, Pax8 tenant onboarding, and Instantly campaign integration — with RBAC, audit logging, and Microsoft SSO built in. Streamlined day-to-day operations and lifted company production efficiency by 65%. Built with React (TypeScript), Python, and PowerShell.'
  },
  {
    href: 'https://youtu.be/LTV6D4djs4U?si=PhUe2S-2AzqHnhnx',
    img: '/images/punctoai.png',
    title: 'Puncto Ai',
    desc: 'An AI-assisted grammar, punctuation, and spelling tool that highlights and corrects mistakes in real time — capable of resolving up to 95% of punctuation errors across 500-word inputs using Hugging Face-trained models. Built with Python, FastAPI, and React (TypeScript).'
  },
  {
    href: 'https://youtu.be/XAl52Pq1FZs?si=GP8Q9Sbno5gePuOd',
    img: '/images/biohome.png',
    title: 'BioHome Game',
    desc: 'An educational Android game that teaches biomolecules through interactive exploration, puzzles, and narrative-driven gameplay — designed to spark curiosity and sustain student interest in biology. Built with Godot and C#.'
  },
  {
    href: 'https://doi.org/10.5281/zenodo.14510257',
    img: '/images/simulation.jpeg',
    title: 'Queen Pineapple Supply Chain Simulation',
    desc: 'A research-backed simulation study analyzing the Queen Pineapple supply chain in Camarines Norte — modeling logistics flows, identifying bottlenecks, and informing data-driven strategies for local growers and distributors. Published as an academic paper and built with AnyLogic and Java.'
  },
]

const SOCIALS = [
  ['https://www.instagram.com/itsgerrykun/', '/images/icons/instagram.svg', 'Instagram', 'social-icon'],
  ['https://www.linkedin.com/in/gerry-vien-flores-224811248/', '/images/icons/linkedin.svg', 'LinkedIn', 'social-icon'],
  ['https://github.com/05-14th', '/images/icons/github.svg', 'GitHub', 'social-icon bg-white rounded'],
]

export default function App() {
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
              <img src="/images/flores.png" alt="Gerry Vien Flores" className="img-fluid profile-pic" />
            </div>
            <div className="col-lg-8">
              <div className="text-panel">
                <h1 className="text-uppercase fw-bold fs-1 mb-3">
                  Gerry Vien Flores
                </h1>

                <h2 className="fs-5 fw-semibold mb-4">
                  Software Developer • IT Student
                </h2>

                <p className="lead mb-3">
                  Software Developer at Clario Capital and IT student at Camarines Norte State College, specializing in web development, custom software, and intelligent automation that turns complex workflows into streamlined, scalable systems.
                </p>

                <p>
                  I partner with businesses and teams to design and ship reliable, high-impact solutions — from full-stack web platforms to AI-powered tools — engineered to drive measurable efficiency, reduce overhead, and deliver real results.
                </p>
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
            {SKILLS.map(([src, alt]) => (
              <div key={alt} className="col-4 col-md-2 text-center reveal">
                <div className="skill-badge" title={alt}>
                  <img src={src} alt={alt} className="skill-icon" loading="lazy" />
                  <span className="skill-label">{alt}</span>
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
            {WORKS.map(card => (
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

      {/* Footer */}
      <footer id="contact" className="bg-dark text-center text-light py-5 reveal">
        <div className="container">
          <h2 className="mb-4">Let&apos;s connect!</h2>
          <div className="row justify-content-center g-3 mb-4">
            {SOCIALS.map(([href, img, label, cls]) => (
              <div key={label} className="col-auto">
                <a href={href} target="_blank" rel="noopener noreferrer" className="text-decoration-none" aria-label={label}>
                  <img src={img} alt={label} className={cls} />
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
