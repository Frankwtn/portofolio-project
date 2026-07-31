import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CERTIFICATIONS } from '../data/certifications'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import AuroraBackground from '../components/layout/AuroraBackground'
import Cursor from '../components/layout/Cursor'
import { useReveal } from '../hooks/useReveal'
import { useCursor } from '../hooks/useCursor'
import { useSmoothScroll } from '../hooks/useSmoothScroll'
import PageLoader from '../components/shared/PageLoader'
import CertPreviewModal from '../components/shared/CertPreviewModal'

function CertCard({ cert, idx, onPreview }) {
  const [flipped, setFlipped] = useState(false)

  function onMouseMove(e) {
    const r = e.currentTarget.getBoundingClientRect()
    const front = e.currentTarget.querySelector('.cert-front')
    const back  = e.currentTarget.querySelector('.cert-back')
    ;[front, back].forEach(f => {
      if (f) {
        f.style.setProperty('--mx', (e.clientX - r.left) + 'px')
        f.style.setProperty('--my', (e.clientY - r.top)  + 'px')
      }
    })
  }
  function onEnter() {
    const ring = document.getElementById('cursorRing')
    if (ring) { ring.setAttribute('data-label', 'FLIP'); ring.classList.add('hover', 'with-label') }
  }
  function onLeave() {
    const ring = document.getElementById('cursorRing')
    if (ring) { ring.removeAttribute('data-label'); ring.classList.remove('hover', 'with-label') }
  }

  return (
    <li
      className="cert-card reveal"
      data-delay={`${(idx % 3) * 70}`}
      onMouseMove={onMouseMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={() => setFlipped(f => !f)}
      aria-label={`${cert.issuer} ${cert.name}`}
    >
      <div className={`cert-card-inner ${flipped ? 'flipped' : ''}`}>
        <div className="cert-front">
          <div className="flex flex-col">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/10 mb-3 transition-all duration-300 hover:scale-105 hover:-rotate-[4deg]"
              style={{ background: cert.logoUrl ? 'rgba(255,255,255,0.06)' : cert.logoGrad }}
              aria-hidden="true"
            >
              {cert.logoUrl ? (
                <img
                  src={cert.logoUrl}
                  alt={cert.issuer}
                  className="w-7 h-7 object-contain rounded-md"
                />
              ) : (
                <span className="font-display text-[20px] font-bold">{cert.letter}</span>
              )}
            </div>
            <p className="font-mono text-[10px] text-aurora2 tracking-[0.08em] mb-1">{cert.issuer}</p>
            <h3 className="font-display text-[14px] font-semibold leading-tight mb-1 transition-colors duration-300">{cert.name}</h3>
            <p className="font-mono text-[10px] text-muted">{cert.year}</p>
          </div>
          <span
            className={`self-start font-mono text-[9px] tracking-[0.1em] px-2 py-0.5 rounded-full border w-fit ${cert.ongoing
              ? 'border-aurora3/40 text-aurora3 bg-aurora3/8'
              : 'border-aurora2/35 text-aurora2 bg-aurora2/8'
            }`}
            style={cert.ongoing ? { animation: 'certPulse 2.4s ease-in-out infinite' } : {}}
            aria-label={`Status: ${cert.status}`}
          >
            {cert.status}
          </span>
        </div>
        <div className="cert-back">
          <p className="text-[11px] text-muted leading-relaxed flex-1">{cert.desc}</p>
          <ul className="flex flex-wrap gap-1.5 list-none p-0 m-0">
            {cert.skills.map(s => (
              <li key={s} className="text-[9px] px-2 py-0.5 rounded-full border border-white/10 text-muted font-mono">{s}</li>
            ))}
          </ul>
          <button
            type="button"
            onClick={e => { e.stopPropagation(); onPreview(cert) }}
            className="font-mono text-[10px] tracking-[0.08em] text-aurora2 inline-flex items-center gap-1 w-fit transition-[gap] duration-300 hover:gap-2 bg-transparent border-none p-0 cursor-pointer"
            data-magnetic
            aria-label={`Lihat sertifikat ${cert.name}`}
          >
            Lihat Sertifikat ↗
          </button>
        </div>
      </div>
    </li>
  )
}

function CertificationsPageInner() {
  useReveal()
  useCursor()
  useSmoothScroll()

  const [previewCert, setPreviewCert] = useState(null)

  return (
    <>
      <div className="relative z-[2]">
        <main>
          <section
            className="pt-[120px] pb-12 flex items-end justify-between flex-wrap gap-6 max-w-[1200px] mx-auto px-[8vw]"
            aria-labelledby="cpage-heading"
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
                  Pelatihan &amp; Sertifikat
                </p>
                <h1
                  id="cpage-heading"
                  className="font-display font-bold leading-[0.95] mt-2.5"
                  style={{ fontSize: 'clamp(36px,6vw,72px)' }}
                >
                  <span className="line"><span>Semua pelatihan &amp; sertifikat.</span></span>
                </h1>
              </div>

              <p
                className="opacity-0 text-muted text-[14px] leading-[1.7] max-w-[480px] mt-4"
                style={{ animation: 'fadeUp 0.9s ease forwards 0.28s' }}
              >
                Pelatihan dan sertifikat resmi yang memvalidasi keahlian teknis dan desain saya.
              </p>
            </div>

            <div
              className="opacity-0 text-right flex-shrink-0 font-mono"
              style={{ animation: 'fadeUp 0.9s ease forwards 0.38s' }}
              aria-hidden="true"
            >
              <span
                className="block font-bold leading-none tracking-[-0.04em]"
                style={{ fontSize: 'clamp(48px,6vw,80px)', color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.09)' }}
              >
                {String(CERTIFICATIONS.length).padStart(2, '0')}
              </span>
              <span className="text-[11px] text-muted uppercase tracking-[0.12em]">pelatihan &amp; sertifikat</span>
            </div>
          </section>

          <section className="max-w-[1200px] mx-auto px-[8vw] pb-20" aria-label="Daftar pelatihan dan sertifikat">
            <ul
              className="grid grid-cols-3 gap-4 list-none p-0 m-0 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1"
              role="list"
              aria-label="Semua pelatihan dan sertifikat"
            >
              {CERTIFICATIONS.map((cert, i) => (
                <CertCard key={cert.name} cert={cert} idx={i} onPreview={setPreviewCert} />
              ))}
            </ul>
          </section>
        </main>
      </div>

      <CertPreviewModal cert={previewCert} onClose={() => setPreviewCert(null)} />
    </>
  )
}

export default function CertificationsPage() {
  return (
    <>
      <PageLoader />
      <AuroraBackground />
      <Cursor />
      <Navbar isProjectsPage />
      <CertificationsPageInner />
      <Footer />
    </>
  )
}
