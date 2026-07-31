/**
 * Projects.jsx
 * ─────────────────────────────────────────────────────────────
 * Section "Proyek Pilihan" di halaman Home.
 *
 * LAYOUT:
 *   Header + grid 3 kolom rata — semua FEATURED_PROJECTS ukuran sama.
 *   Klik card → buka ProjectModal.
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FEATURED_PROJECTS } from '../../data/projects'
import ProjectCard from '../shared/ProjectCard'
import ProjectModal from '../shared/ProjectModal'

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null)

  return (
    <section id="projects" className="px-[8vw] py-[clamp(48px,8vh,96px)] max-w-[1200px] mx-auto" aria-labelledby="projects-heading">
      <header className="flex justify-between items-end mb-7 flex-wrap gap-3">
        {/* Heading */}
        <hgroup className="reveal" data-delay="0">
          <p className="inline-flex items-center gap-2.5 text-[12px] text-aurora2 uppercase tracking-wide mb-[18px] font-mono before:content-[''] before:w-6 before:h-px before:bg-aurora2">
            Portofolio
          </p>
          <h2 id="projects-heading" className="font-display text-[clamp(24px,3vw,40px)] font-semibold">
            <span className="line"><span>Proyek pilihan.</span></span>
          </h2>
        </hgroup>
        {/* Subtitle + CTA */}
        <div className="reveal" data-delay="0">
          <p className="text-muted text-[14px] mb-4">Beberapa karya yang paling merepresentasikan cara saya bekerja.</p>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-mono border border-white/10 text-muted hover:text-text hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300"
            data-magnetic
          >
            Lihat Semua ↗
          </Link>
        </div>
      </header>

      {/* Grid rata — semua proyek ukuran sama */}
      <ul
        className="reveal grid grid-cols-3 gap-3.5 list-none p-0 m-0 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1"
        data-delay="0"
        role="list"
        aria-label="Proyek pilihan"
      >
        {FEATURED_PROJECTS.map(p => (
          <ProjectCard key={p.id} project={p} onClick={() => setActiveProject(p)} />
        ))}
      </ul>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  )
}
