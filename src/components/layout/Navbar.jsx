import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { href: '#about',          label: 'Tentang' },
  { href: '#skills',         label: 'Keahlian' },
  { href: '#experience',     label: 'Pengalaman' },
  { href: '#projects',       label: 'Proyek' },
  { href: '#certifications', label: 'Pelatihan' },
  { href: '#now',            label: 'Sekarang' },
  { href: '#contact',        label: 'Kontak' },
]

export default function Navbar({ isProjectsPage = false }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    if (isProjectsPage) return
    function onScroll() {
      let current = ''
      document.querySelectorAll('main section[id]').forEach(s => {
        if (window.scrollY >= s.offsetTop - 140) current = s.id
      })
      setActiveId(current)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [isProjectsPage])

  function closeMenu() {
    setMenuOpen(false)
  }

  const logoEl = isProjectsPage
    ? <Link to="/" state={{ skipPreloader: true }} className="logo nav-pill px-5 py-2.5 text-base font-semibold z-10 relative" aria-label="Kembali ke beranda">Frank Wuaten<span className="text-aurora2">.</span></Link>
    : <a href="#hero" className="logo nav-pill px-5 py-2.5 text-base font-semibold z-10 relative" aria-label="Ke halaman utama">Frank Wuaten<span className="text-aurora2">.</span></a>

  const links = isProjectsPage
    ? NAV_LINKS.filter(l => l.href !== '#certifications').map(l => ({
        href: '/' + l.href,
        label: l.label,
        active: false,
      }))
    : NAV_LINKS.map(l => ({
        href: l.href,
        label: l.label,
        active: activeId === l.href.slice(1),
      }))

  return (
    <>
      <header className="relative z-[100]">
        <nav
          className="fixed top-4 left-0 right-0 z-[100] flex justify-between items-center px-[8vw] py-4"
          style={{ opacity: isProjectsPage ? 1 : undefined, animation: isProjectsPage ? 'none' : 'navIn .9s ease forwards' }}
          aria-label="Navigasi utama"
        >
          {logoEl}

          {/* Desktop nav links pill */}
          <ul className="nav-pill hidden md:flex gap-1 text-sm list-none px-2.5 py-1.5 font-mono" role="list">
            {links.map(l => (
              <li key={l.href} className="relative z-10">
                {isProjectsPage
                  ? <Link to={l.href} state={{ skipPreloader: true }} className={`block px-4 py-1.5 rounded-full text-[13px] transition-all duration-300 ${l.active ? 'text-text bg-white/10' : 'text-text/65 hover:text-text hover:bg-white/10'}`}>{l.label}</Link>
                  : <a href={l.href}  className={`block px-4 py-1.5 rounded-full text-[13px] transition-all duration-300 ${l.active ? 'text-text bg-white/15 font-medium' : 'text-text/65 hover:text-text hover:bg-white/10'}`}>
                      {l.active && <span className="inline-block w-1 h-1 rounded-full bg-aurora2 mr-1.5 mb-px" style={{animation:'pulse2 2s infinite'}} />}
                      {l.label}
                    </a>
                }
              </li>
            ))}
          </ul>

          {/* CTA — Download CV */}
          <a
            href="/cv.pdf"
            download="Frank_Emmanuel_Wuaten_CV.pdf"
            className="btn-ghost nav-pill hidden md:flex items-center gap-2 px-5 py-2.5 text-[13px] font-mono font-medium rounded-full border text-text/80 hover:text-aurora2 transition-all duration-300 relative overflow-hidden group"
            style={{
              borderColor: 'rgba(0,217,192,0.35)',
              boxShadow: '0 0 0 0 rgba(0,217,192,0)',
              animation: 'cvGlow 2.8s ease-in-out infinite',
            }}
            id="navCta"
            data-magnetic
            aria-label="Unduh CV Frank Emmanuel Wuaten"
          >
            {/* Shimmer sweep */}
            <span
              className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(0,217,192,0.15) 50%, transparent 60%)', animation: 'cvShimmer 1.8s ease infinite' }}
              aria-hidden="true"
            />
            {/* Bouncing arrow */}
            <span style={{ display: 'inline-block', animation: 'cvArrow 1.2s ease-in-out infinite' }} aria-hidden="true">↓</span>
            Download CV
          </a>

          {/* Burger */}
          <button
            className={`nav-burger flex md:hidden w-10 h-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex-col items-center justify-center gap-[5px] cursor-pointer ${menuOpen ? 'open' : ''}`}
            id="navBurger"
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={menuOpen}
            aria-controls="mobileMenu"
            onClick={() => setMenuOpen(o => !o)}
          >
            <span className={`block w-4 h-px bg-text transition-transform duration-300 ${menuOpen ? 'translate-y-1.5 rotate-45' : ''}`} />
            <span className={`block w-4 h-px bg-text transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-4 h-px bg-text transition-transform duration-300 ${menuOpen ? '-translate-y-1.5 -rotate-45' : ''}`} />
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <nav
        className={`mobile-menu fixed top-0 right-0 h-screen w-[min(78vw,320px)] z-[150] bg-bg/85 backdrop-blur-xl border-l border-white/10 flex flex-col justify-center gap-2 px-11 font-mono transition-transform duration-500 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        id="mobileMenu"
        aria-label="Menu mobile"
        aria-hidden={!menuOpen}
      >
        <ul className="list-none p-0 m-0" role="list">
          {links.map((l, i) => (
            <li key={l.href}>
              {isProjectsPage
                ? <Link to={l.href} state={{ skipPreloader: true }} onClick={closeMenu} className={`block text-[22px] py-3.5 border-b border-white/10 text-muted hover:text-text transition-colors duration-300 ${menuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'}`} style={{ transitionDelay: menuOpen ? `${0.1 + i * 0.06}s` : '0s' }}>{l.label}</Link>
                : <a href={l.href} onClick={closeMenu} className={`block text-[22px] py-3.5 border-b border-white/10 text-muted hover:text-text transition-colors duration-300 ${menuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'}`} style={{ transitionDelay: menuOpen ? `${0.1 + i * 0.06}s` : '0s' }}>{l.label}</a>
              }
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
