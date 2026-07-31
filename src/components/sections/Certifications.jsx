/**
 * Certifications.jsx
 * ─────────────────────────────────────────────────────────────
 * Section "Pelatihan & Sertifikat" di halaman Home — menampilkan 6 flip card.
 *
 * KOMPONEN INTERNAL:
 *   CertCard({ cert, idx, onPreview }) — kartu flip 3D individual
 *
 * ANIMASI FLIP:
 *   State `flipped` toggle class .flipped pada .cert-card-inner.
 *   CSS transform: rotateY(180deg) pada .cert-card-inner saat .flipped.
 *   Front dan back menggunakan backface-visibility: hidden.
 *
 * CURSOR:
 *   Label "FLIP" pada cursorRing saat hover.
 *   Specular glass diupdate manual (bukan via GlassCard) karena cert-front
 *   dan cert-back perlu masing-masing mendapat --mx/--my.
 *
 * REVEAL:
 *   Tiap .cert-card.reveal trigger sendiri (bukan stagger grup).
 *   data-delay bergantian per kolom: 0ms, 70ms, 140ms.
 *
 * LINK:
 *   Tombol "Lihat Semua" → /certifications (CertificationsPage.jsx)
 *
 * CARA MENAMBAH:
 *   Edit src/data/certifications.js.
 *   Grid otomatis menyesuaikan (3 kolom → 2 → 1 di mobile).
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CERTIFICATIONS } from '../../data/certifications'
import CertPreviewModal from '../shared/CertPreviewModal'

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
      className={`cert-card reveal`}
      data-delay={`${(idx % 3) * 70}`}
      onMouseMove={onMouseMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={() => setFlipped(f => !f)}
      aria-label={`${cert.issuer} ${cert.name}`}
    >
      <div className={`cert-card-inner ${flipped ? 'flipped' : ''}`}>
        {/* Front */}
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

        {/* Back */}
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

export default function Certifications() {
  const [previewCert, setPreviewCert] = useState(null)

  return (
    <>
      <section id="certifications" className="px-[8vw] py-[clamp(48px,8vh,96px)] max-w-[1200px] mx-auto" aria-labelledby="cert-heading">
        <header className="flex justify-between items-end mb-7 flex-wrap gap-3">
          <hgroup className="reveal" data-delay="0">
            <p className="inline-flex items-center gap-2.5 text-[12px] text-aurora2 uppercase tracking-wide mb-[18px] font-mono before:content-[''] before:w-6 before:h-px before:bg-aurora2">
              Pelatihan &amp; Sertifikat
            </p>
            <h2 id="cert-heading" className="font-display text-[clamp(24px,3vw,40px)] font-semibold">
              <span className="line"><span>Kredensial &amp; lisensi.</span></span>
            </h2>
          </hgroup>
          <div className="reveal" data-delay="100">
            <p className="text-muted text-[13px] max-w-[300px] mb-4">
              Pelatihan dan sertifikat resmi yang memvalidasi keahlian teknis dan desain saya.
            </p>
            <Link
              to="/certifications"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-mono border border-white/10 text-muted hover:text-text hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300"
              data-magnetic
            >
              Lihat Semua ↗
            </Link>
          </div>
        </header>

        <ul
          className="grid grid-cols-3 gap-4 list-none p-0 m-0 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1"
          role="list"
          aria-label="Daftar pelatihan dan sertifikat"
        >
          {CERTIFICATIONS.map((cert, i) => (
            <CertCard key={cert.name} cert={cert} idx={i} onPreview={setPreviewCert} />
          ))}
        </ul>
      </section>

      <CertPreviewModal cert={previewCert} onClose={() => setPreviewCert(null)} />
    </>
  )
}
