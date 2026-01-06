import { useEffect } from 'react'
import HeroThreeBG from './components/HeroThreeBG'
import useScrollReveal from './hooks/useScrollReveal'
import './styles.css'

export default function App() {
  // Handles closing the navbar on link click
  useEffect(() => {
    const links = document.querySelectorAll('.navbar-nav .nav-link')
    links.forEach((l) =>
      l.addEventListener('click', () => {
        const navbar = document.getElementById('navbarNav')
        if (navbar?.classList.contains('show')) {
          const toggler = document.querySelector('.navbar-toggler')
          toggler?.click()
        }
      })
    )
  }, [])

  // Initialize scroll animations
  useScrollReveal('.reveal')

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#">CodeView</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
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
      <section id="home" className="hero-section reveal">
        <HeroThreeBG />
        <div className="container position-relative content-spacing">
          <div className="row align-items-center">
            <div className="col-lg-4 text-center mb-4 mb-lg-0">
              <img src="/images/flores.png" alt="Author" className="img-fluid profile-pic" />
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
                  I am a Software Developer at Clario Capital and an IT student at Camarines Norte State College, with a strong focus on web development, software development, and automation.
                </p>

                <p>
                  I actively participate in development projects to gain hands-on experience and continuously improve my skills in delivering efficient and reliable IT solutions.
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
            {[
              ['https://www.php.net/images/logos/new-php-logo.svg','PHP'],
              ['https://s3.dualstack.us-east-2.amazonaws.com/pythondotorg-assets/media/files/python-logo-only.svg','Python'],
              ['https://upload.wikimedia.org/wikipedia/commons/b/bd/Logo_C_sharp.svg','C#'],
              ['https://upload.wikimedia.org/wikipedia/commons/4/40/VB.NET_Logo.svg','VB.NET'],
              ['https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg','JavaScript'],
              ['https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg','TypeScript'],
              ['https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg','React'],
              ['https://upload.wikimedia.org/wikipedia/commons/b/b2/Bootstrap_logo.svg','Bootstrap'],
              ['https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg','Tailwind'],
              ['https://upload.wikimedia.org/wikipedia/commons/0/0a/MySQL_textlogo.svg','MySQL'],
              ['https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg','MongoDB'],
              ['https://www.vectorlogo.zone/logos/android/android-icon.svg','Android'],
              ['https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg','Firebase'],
              ['https://www.vectorlogo.zone/logos/godotengine/godotengine-icon.svg','Godot'],
            ].map(([src, alt]) => (
              <div key={alt} className="col-4 col-md-2 text-center reveal">
                <div className="skill-badge" title={alt}>
                  <img src={src} alt={alt} className="skill-icon" />
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
            {[
              {
                href: 'https://youtu.be/NiuGTn1yQ-k?si=CBiQFNwja7SIThWX',
                img: '/images/olsmg.png',
                title: 'Transaction Recording System',
                desc: 'Record transactions of products with automatic calculation, receipt generation, and user friendly UI.'
              },
              {
                href: 'https://github.com/05-14th/Medical_Recording_System',
                img: '/images/mediweb.png',
                title: 'Medical Recording Web App',
                desc: 'Create and store medical records with a simple input and output flow delivered via website.'
              },
              {
                href: 'https://github.com/05-14th/tourism-website',
                img: '/images/tourism.PNG',
                title: 'Tourism Web App',
                desc: 'Features Camarines Norte views and delicacies with a control panel for quick updates.'
              },
              {
                href: 'https://youtu.be/LTV6D4djs4U?si=PhUe2S-2AzqHnhnx',
                img: '/images/punctoai.png',
                title: 'Puncto Ai',
                desc: 'Grammar, punctuation, and spelling correction with highlighting. Powered by datasets from Hugging Face.'
              },
              {
                href: 'https://youtu.be/XAl52Pq1FZs?si=GP8Q9Sbno5gePuOd',
                img: '/images/biohome.png',
                title: 'BioHome Game',
                desc: 'Educational Android game about biomolecules. Teaches with interactive gameplay.'
              },
              {
                href: 'https://doi.org/10.5281/zenodo.14510257',
                img: '/images/simulation.jpeg',
                title: 'Queen Pineapple Supply Chain Simulation',
                desc: 'Identifies inefficiencies and supports strategy design using AnyLogic.'
              },
            ].map(card => (
              <div key={card.title} className="col-12 col-md-6 col-lg-4 text-white reveal">
                <div className="project-card interactive">
                  <div className="thumb-wrap">
                    <a href={card.href}><img src={card.img} alt={card.title} className="project-img" /></a>
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
            <div className="col-auto">
              <a href="https://www.instagram.com/itsgerrykun/" className="text-decoration-none">
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" alt="Instagram" className="social-icon" />
              </a>
            </div>
            <div className="col-auto">
              <a href="https://www.linkedin.com/in/gerry-vien-flores-224811248/" className="text-decoration-none">
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg" alt="LinkedIn" className="social-icon" />
              </a>
            </div>
            <div className="col-auto">
              <a href="https://github.com/05-14th" className="text-decoration-none">
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="GitHub" className="social-icon bg-white rounded" />
              </a>
            </div>
          </div>
          <p className="mb-0">CodeView &copy; 2025</p>
        </div>
      </footer>
    </div>
  )
}
