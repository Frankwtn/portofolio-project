/**
 * ProjectModal.jsx
 * ─────────────────────────────────────────────────────────────
 * Modal overlay detail proyek — galeri gambar + metadata.
 *
 * CARA BUKA/TUTUP:
 *   - Buka: prop `project` di-set ke objek Project (truthy)
 *   - Tutup: klik backdrop, klik tombol ✕, atau tekan Escape
 *
 * LAYOUT (grid 2 kolom):
 *   Kiri  — galeri thumbnail + navigasi dot
 *   Kanan — tags, judul, deskripsi, chip metadata (lang/year/tools), tombol link
 *
 * GALERI:
 *   galleryIdx mengontrol gambar aktif.
 *   CSS class .active pada .proj-gallery-img yang aktif (opacity transition).
 *   Thumbnail kecil di bawah gambar utama untuk navigasi manual.
 *
 * SIDE EFFECTS:
 *   - Reset galleryIdx ke 0 saat project berubah
 *   - Lock body scroll (overflow: hidden) saat modal terbuka
 *   - Event listener Escape untuk menutup modal
 *
 * ACCESSIBILITY:
 *   role="dialog", aria-modal="true", aria-hidden saat tertutup.
 *
 * PROPS:
 * @param {Project|null} project — proyek yang ditampilkan (null = modal tertutup)
 * @param {Function}     onClose — callback untuk menutup modal
 */

import { useState, useEffect } from 'react'

export default function ProjectModal({ project, onClose }) {
  const [galleryIdx, setGalleryIdx] = useState(0)

  useEffect(() => {
    setGalleryIdx(0)
    if (project) {
      document.body.style.overflow = 'hidden'
    }
    return () => { document.body.style.overflow = '' }
  }, [project])

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const isOpen = !!project

  return (
    <div
      className={`proj-modal-backdrop ${isOpen ? 'open' : ''}`}
      id="projModal"
      aria-modal="true"
      role="dialog"
      aria-label="Detail proyek"
      aria-hidden={!isOpen}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="proj-modal glass">
        <button
          className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-white/8 border border-white/10 text-muted text-[13px] flex items-center justify-center cursor-pointer hover:bg-white/12 hover:text-text hover:rotate-90 transition-all duration-300"
          onClick={onClose}
          aria-label="Tutup modal"
        >✕</button>

        {/* Gallery */}
        <div className="flex flex-col gap-2 p-5 bg-white/5 border-r border-white/10 md:border-b-0 border-b">
          <div className="flex-1 min-h-[190px] rounded-[10px] overflow-hidden relative">
            {project?.gallery.map((g, i) => {
              const isImg = g.startsWith('/') || g.startsWith('http')
              return isImg ? (
                <img
                  key={i}
                  src={g}
                  alt={`${project.title} screenshot ${i + 1}`}
                  className={`proj-gallery-img object-cover ${i === galleryIdx ? 'active' : ''}`}
                />
              ) : (
                <div
                  key={i}
                  className={`proj-gallery-img ${i === galleryIdx ? 'active' : ''}`}
                  style={{ background: g }}
                />
              )
            })}
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {project?.gallery.map((g, i) => {
              const isImg = g.startsWith('/') || g.startsWith('http')
              return isImg ? (
                <button
                  key={i}
                  className={`w-14 h-9 rounded-[6px] overflow-hidden border cursor-pointer transition-all duration-300 p-0 ${i === galleryIdx ? 'border-aurora2 scale-105' : 'border-white/10 hover:border-aurora2/40'}`}
                  onClick={() => setGalleryIdx(i)}
                  aria-label={`Gambar ${i + 1}`}
                >
                  <img src={g} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ) : (
                <button
                  key={i}
                  className={`w-14 h-9 rounded-[6px] overflow-hidden border cursor-pointer transition-all duration-300 ${i === galleryIdx ? 'border-aurora2 scale-105' : 'border-white/10 hover:border-aurora2/40'}`}
                  style={{ background: g }}
                  onClick={() => setGalleryIdx(i)}
                  aria-label={`Gambar ${i + 1}`}
                />
              )
            })}
          </div>
        </div>

        {/* Info */}
        <div className="p-7 flex flex-col gap-3 justify-center">
          <ul className="flex gap-1.5 flex-wrap list-none p-0 m-0">
            {project?.tags.map(t => (
              <li key={t} className="text-[9px] px-2 py-0.5 rounded-full border border-white/10 text-muted font-mono">{t}</li>
            ))}
          </ul>
          <h2 className="font-display text-[clamp(18px,2.4vw,26px)] font-bold leading-tight mt-0.5">
            {project?.title}
          </h2>
          <p className="text-muted text-[13px] leading-relaxed flex-grow">{project?.desc}</p>
          <div className="flex flex-col gap-2.5">
            {project && (
              <>
                {/* Satu baris info: Tahun + semua bahasa + semua tools */}
                <div className="flex flex-col gap-2">

                  {/* Tahun — single chip */}
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] text-muted uppercase tracking-[0.08em] w-10 flex-shrink-0">Tahun</span>
                    <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-white/6 border border-white/12 text-text">
                      {project.year}
                    </span>
                  </div>

                  {/* Lang — neutral chips */}
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-[9px] text-muted uppercase tracking-[0.08em] w-10 flex-shrink-0 mt-1">Lang</span>
                    <div className="flex flex-wrap gap-1.5">
                      {(Array.isArray(project.lang) ? project.lang : project.lang.split(',').map(l => l.trim())).map(l => (
                        <span key={l} className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-white/6 border border-white/12 text-text">
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tools — aurora2 chips */}
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-[9px] text-muted uppercase tracking-[0.08em] w-10 flex-shrink-0 mt-1">Tools</span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tools.map(t => (
                        <span key={t} className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-aurora2/8 border border-aurora2/25 text-aurora2">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </>
            )}
          </div>
          <a
            href={project?.link || '#'}
            className="self-start mt-0.5 inline-flex items-center gap-2 px-[22px] py-[11px] rounded-full text-[13px] font-medium bg-white/8 border border-white/10 backdrop-blur-md hover:border-aurora2 hover:bg-aurora2/10 hover:-translate-y-0.5 transition-all duration-300"
            target="_blank"
            rel="noopener"
            data-magnetic
          >
            Buka Proyek <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </div>
  )
}
