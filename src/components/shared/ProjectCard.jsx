/**
 * ProjectCard.jsx
 * ─────────────────────────────────────────────────────────────
 * Card proyek untuk carousel di section Projects (Home) dan grid di /projects.
 *
 * HOVER PREVIEW:
 *   State `hovered` mengontrol:
 *   - Tinggi thumb: 110px → 130px (CSS transition height)
 *   - Background scale: 1.0 → 1.08 (zoom in)
 *   - Watermark nomor: scale → 1.15, translateY(-4px)
 *   - Tool tags overlay: opacity 0 → 1 (fade in dari bawah)
 *   - Year badge: opacity 0 → 1 (fade in kanan atas)
 *
 * CURSOR:
 *   Label "OPEN" pada cursorRing saat hover.
 *   Specular glass via --mx/--my pada elemen card.
 *
 * PROPS:
 * @param {Project} project — objek proyek dari data/projects.js
 * @param {Function} onClick — callback saat card diklik (buka modal)
 */

import { useState } from 'react'

export default function ProjectCard({ project, onClick }) {
  const [hovered, setHovered] = useState(false)

  function onMouseMove(e) {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', (e.clientX - r.left) + 'px')
    e.currentTarget.style.setProperty('--my', (e.clientY - r.top)  + 'px')
  }

  function handleMouseEnter() {
    setHovered(true)
    const ring = document.getElementById('cursorRing')
    if (ring) { ring.setAttribute('data-label', 'OPEN'); ring.classList.add('hover', 'with-label') }
  }
  function handleMouseLeave() {
    setHovered(false)
    const ring = document.getElementById('cursorRing')
    if (ring) { ring.removeAttribute('data-label'); ring.classList.remove('hover', 'with-label') }
  }

  return (
    <article
      className="glass overflow-hidden cursor-none transition-all duration-[450ms] hover:-translate-y-1.5 hover:scale-[1.012] hover:shadow-[0_12px_32px_rgba(0,0,0,0.45)] hover:border-aurora2/25 will-change-transform"
      role="listitem"
      data-project={project.id}
      onMouseMove={onMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      aria-label={project.title}
    >
      {/* Thumb with hover preview */}
      {(() => {
        const isImg = project.thumb?.startsWith('/') || project.thumb?.startsWith('http')
        return (
          <div
            className="relative overflow-hidden"
            style={{ height: hovered ? 130 : 110, transition: 'height 0.4s cubic-bezier(.16,1,.3,1)', background: isImg ? 'transparent' : project.thumb }}
          >
            {/* BG — foto atau gradient */}
            {isImg ? (
              <img
                src={project.thumb}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out"
                style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
              />
            ) : (
              <div
                className="absolute inset-0 transition-transform duration-700 ease-out"
                style={{ background: project.thumb, transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
              />
            )}


            {/* Hover overlay: tags preview */}
            <div
              className="absolute inset-0 flex flex-col justify-end p-2.5 transition-opacity duration-300"
              style={{ opacity: hovered ? 1 : 0, background: 'linear-gradient(to top, rgba(10,12,16,0.85) 0%, transparent 60%)' }}
            >
              <ul className="flex gap-1 flex-wrap list-none p-0 m-0">
                {project.tools?.slice(0, 3).map(t => (
                  <li key={t} className="text-[8px] px-1.5 py-0.5 rounded-full bg-aurora2/20 border border-aurora2/30 text-aurora2 font-mono">{t}</li>
                ))}
              </ul>
            </div>

            {/* Year badge top-right */}
            <span
              className="absolute top-2 right-2 font-mono text-[9px] text-white/40 transition-opacity duration-300"
              style={{ opacity: hovered ? 1 : 0 }}
            >
              {project.year}
            </span>
          </div>
        )
      })()}

      <div className="p-2.5 px-3 pb-3.5">
        <ul className="flex gap-1.5 flex-wrap list-none p-0 m-0">
          {project.tags.map(t => (
            <li key={t} className="text-[9px] px-2 py-0.5 rounded-full border border-white/10 text-muted font-mono">{t}</li>
          ))}
        </ul>
        <h3 className="text-[12px] font-semibold my-1.5 text-text/90 hover:text-aurora2 transition-colors duration-300">{project.title}</h3>
        <p className="text-muted text-[10px] leading-relaxed">{project.desc}</p>
      </div>
    </article>
  )
}
