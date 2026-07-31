import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { PROJECTS } from '../data/projects'
import ProjectModal from '../components/shared/ProjectModal'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import AuroraBackground from '../components/layout/AuroraBackground'
import Cursor from '../components/layout/Cursor'
import { useReveal } from '../hooks/useReveal'
import { useCursor } from '../hooks/useCursor'
import { useSmoothScroll } from '../hooks/useSmoothScroll'
import PageLoader from '../components/shared/PageLoader'

const FILTERS = [
  { key: 'all',       label: 'Semua' },
  { key: 'web',       label: 'Web App' },
  { key: 'mobile',    label: 'Mobile' },
  { key: 'branding',  label: 'Branding' },
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'design',    label: 'UI Design' },
]

function ProjectsPageInner() {
  const [filter, setFilter] = useState('all')
  const [activeProject, setActiveProject] = useState(null)
  const [count, setCount]   = useState('00')
  const countRef = useRef(null)

  useReveal()
  useCursor()
  useSmoothScroll()

  // Animated count
  useEffect(() => {
    const total = PROJECTS.length
    let frame = 0
    const dur = 60
    const id = setTimeout(() => {
      const tick = () => {
        frame++
        const val = Math.min(Math.round((frame / dur) * total), total)
        setCount(String(val).padStart(2, '0'))
        if (frame < dur) requestAnimationFrame(tick)
        else {
          if (countRef.current) {
            countRef.current.style.color = 'var(--text)'
            countRef.current.style.webkitTextStroke = '0px'
          }
        }
      }
      requestAnimationFrame(tick)
    }, 600)
    return () => clearTimeout(id)
  }, [])

  function isVisible(card) {
    if (filter === 'all') return true
    return (card.cats || []).includes(filter)
  }

  function handleMouseEnterCard() {
    const ring = document.getElementById('cursorRing')
    if (ring) { ring.setAttribute('data-label', 'OPEN'); ring.classList.add('hover', 'with-label') }
  }
  function handleMouseLeaveCard() {
    const ring = document.getElementById('cursorRing')
    if (ring) { ring.removeAttribute('data-label'); ring.classList.remove('hover', 'with-label') }
  }
  function onMouseMoveCard(e) {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', (e.clientX - r.left) + 'px')
    e.currentTarget.style.setProperty('--my', (e.clientY - r.top) + 'px')
  }

  const visible = PROJECTS.filter(isVisible)

  return (
    <div className="relative z-[2]">
      <main>
        {/* Hero */}
        <section
          className="pt-[120px] pb-12 flex items-end justify-between flex-wrap gap-6 max-w-[1200px] mx-auto px-[8vw]"
          aria-labelledby="ppage-heading"
        >
          <div className="flex flex-col gap-0">
            <Link
              to="/"
              state={{ skipPreloader: true }}
              className="opacity-0 font-mono text-[12px] text-muted mb-6 inline-flex items-center gap-2 transition-[color,gap] duration-300 hover:text-aurora2 hover:gap-3"
              style={{ animation: 'fadeUp 0.8s ease forwards 0.05s' }}
              aria-label="Kembali"
            >
              ← Kembali
            </Link>
            <div className="opacity-0" style={{ animation: 'fadeUp 0.9s ease forwards 0.15s' }}>
              <p className="inline-flex items-center gap-2.5 text-[12px] text-aurora2 uppercase tracking-wide mb-[18px] font-mono before:content-[''] before:w-6 before:h-px before:bg-aurora2">
                Portofolio
              </p>
              <h1
                id="ppage-heading"
                className="font-display font-bold leading-[0.95] mt-2.5"
                style={{ fontSize: 'clamp(36px,6vw,72px)' }}
              >
                <span className="line"><span>Semua proyek.</span></span>
              </h1>
            </div>
            <p className="opacity-0 text-muted text-[14px] leading-[1.7] max-w-[480px] mt-4" style={{ animation: 'fadeUp 0.9s ease forwards 0.28s' }}>
              Kumpulan lengkap karya desain dan pengembangan — dari web app hingga branding.
            </p>
          </div>

          {/* Count */}
          <div className="opacity-0 text-right flex-shrink-0 font-mono" style={{ animation: 'fadeUp 0.9s ease forwards 0.38s' }} aria-hidden="true">
            <span
              ref={countRef}
              className="block font-bold leading-none tracking-[-0.04em] transition-all duration-[600ms]"
              style={{ fontSize: 'clamp(48px,6vw,80px)', color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.09)' }}
            >
              {count}
            </span>
            <span className="text-[11px] text-muted uppercase tracking-[0.12em]">proyek</span>
          </div>
        </section>

        {/* Filter */}
        <section className="max-w-[1200px] mx-auto px-[8vw] pb-8" aria-label="Filter proyek">
          <div className="opacity-0 flex gap-2 flex-wrap" style={{ animation: 'fadeUp 0.9s ease forwards 0.45s' }} role="list" aria-label="Kategori filter">
            {FILTERS.map(f => (
              <button
                key={f.key}
                role="listitem"
                className={`px-4 py-1.5 rounded-full text-[11px] font-mono border cursor-pointer transition-all duration-300 tracking-[0.04em] hover:-translate-y-0.5 ${filter === f.key
                  ? 'bg-aurora2/12 border-aurora2/35 text-aurora2'
                  : 'bg-white/5 border-white/10 text-muted hover:bg-white/8 hover:text-text'
                }`}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </section>

        {/* Grid */}
        <section className="max-w-[1200px] mx-auto px-[8vw] pb-20" aria-label="Daftar proyek">
          <ul
            className="grid grid-cols-3 gap-[18px] list-none p-0 m-0 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1"
            id="ppageGrid"
            role="list"
            aria-label="Semua proyek"
          >
            {PROJECTS.map((p, i) => {
              const show = isVisible(p)
              return (
                <li
                  key={p.id}
                  className={`ppage-card glass reveal overflow-hidden cursor-none transition-all duration-[450ms] hover:-translate-y-1.5 hover:scale-[1.013] hover:shadow-[0_18px_48px_rgba(0,0,0,0.45)] hover:border-aurora2/25 will-change-transform ${!show ? 'hidden' : ''}`}
                  data-delay={`${(i % 3) * 60}`}
                  data-cats={p.cats.join(' ')}
                  style={{ transitionDelay: show ? `${(visible.indexOf(p)) * 40}ms` : '0ms' }}
                  onMouseMove={onMouseMoveCard}
                  onMouseEnter={handleMouseEnterCard}
                  onMouseLeave={handleMouseLeaveCard}
                  onClick={() => setActiveProject(p)}
                >
                  {(() => {
                    const isImg = p.thumb?.startsWith('/') || p.thumb?.startsWith('http')
                    return (
                      <div
                        className="h-40 relative overflow-hidden transition-[height] duration-[450ms] hover:h-44"
                        style={{ background: isImg ? 'transparent' : p.thumb }}
                      >
                        {isImg ? (
                          <img
                            src={p.thumb}
                            alt={p.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.06]"
                          />
                        ) : (
                          <div
                            className="absolute inset-0 transition-transform duration-700 ease-out hover:scale-[1.06]"
                            style={{ background: p.thumb }}
                          />
                        )}
                      </div>
                    )
                  })()}
                  <div className="p-[18px] pb-5">
                    <ul className="flex gap-1.5 flex-wrap list-none p-0 m-0">
                      {p.tags.map(t => <li key={t} className="text-[9px] px-2 py-0.5 rounded-full border border-white/10 text-muted font-mono">{t}</li>)}
                    </ul>
                    <h2 className="text-[16px] font-semibold my-2 transition-colors duration-300 hover:text-aurora2">{p.title}</h2>
                    <p className="text-muted text-[12px] leading-[1.55]">{p.desc}</p>
                  </div>
                </li>
              )
            })}
          </ul>

          {visible.length === 0 && (
            <div className="text-center py-16 text-muted flex flex-col items-center gap-4">
              <span className="text-[36px] opacity-35" aria-hidden="true">◌</span>
              <p className="text-[14px]">Tidak ada proyek dalam kategori ini.</p>
            </div>
          )}
        </section>
      </main>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  )
}

export default function ProjectsPage() {
  return (
    <>
      <PageLoader />
      <AuroraBackground />
      <Cursor />
      <Navbar isProjectsPage />
      <ProjectsPageInner />
      <Footer />
    </>
  )
}
