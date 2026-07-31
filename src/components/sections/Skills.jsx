/**
 * Skills.jsx
 * ─────────────────────────────────────────────────────────────
 * Section "Keahlian" — progress bar per skill.
 *
 * CARA KERJA:
 *   Setiap skill dirender sebagai GlassCard dengan class .skill-item
 *   dan atribut data-level={skill.level}.
 *   useReveal.js membaca data-level dan menganimasikan .skill-fill width
 *   + <meter> value saat elemen masuk viewport (#skillsGrid trigger).
 *
 * ANIMASI:
 *   Grid menggunakan .skills-grid.stagger untuk animasi masuk berurutan.
 *   Skill bar (.skill-fill) dianimasikan oleh animateSkills() di useReveal.
 *   Reset ke 0 saat keluar viewport (resetSkills()).
 *
 * CARA MENAMBAH SKILL:
 *   Edit src/data/skills.js — tambah { label, level } baru.
 *   Grid otomatis menyesuaikan (2 kolom desktop, 1 kolom mobile).
 */

import { useEffect, useRef } from 'react'
import { SKILLS } from '../../data/skills'
import GlassCard from '../shared/GlassCard'

export default function Skills() {
  const gridRef = useRef(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animasikan semua bar saat grid masuk viewport
          grid.querySelectorAll('.skill-item').forEach(item => {
            const level = item.getAttribute('data-level')
            const fill  = item.querySelector('.skill-fill')
            if (fill) {
              fill.style.width = '0%'
              // satu frame jeda agar transition aktif
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  fill.style.width = level + '%'
                })
              })
            }
          })
        } else {
          // Reset saat keluar viewport
          grid.querySelectorAll('.skill-fill').forEach(f => { f.style.width = '0%' })
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(grid)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="px-[8vw] py-[clamp(48px,8vh,96px)] max-w-[1200px] mx-auto" aria-labelledby="skills-heading">
      <header className="flex justify-between items-end mb-7 flex-wrap gap-3">
        {/* Heading — reveal 1 */}
        <hgroup className="reveal" data-delay="0">
          <p className="inline-flex items-center gap-2.5 text-[12px] text-aurora2 uppercase tracking-wide mb-[18px] font-mono before:content-[''] before:w-6 before:h-px before:bg-aurora2">
            Keahlian
          </p>
          <h2 id="skills-heading" className="font-display text-[clamp(24px,3vw,40px)] font-semibold">
            <span className="line"><span>Tools &amp; kemampuan.</span></span>
          </h2>
        </hgroup>
        {/* Subtitle — reveal 2 */}
        <p className="reveal text-muted text-[13px] max-w-[300px]" data-delay="0">
          Kombinasi kemampuan desain dan teknis yang saya asah terus-menerus.
        </p>
      </header>

      {/* Skill bars — grid is stagger, each item is skill-item */}
      <ul
        ref={gridRef}
        className="skills-grid stagger grid grid-cols-2 gap-3 list-none p-0 m-0 max-[700px]:grid-cols-1"
        id="skillsGrid"
        role="list"
        aria-label="Daftar keahlian"
      >
        {SKILLS.map((skill, i) => (
          <GlassCard
            key={skill.label}
            tag="li"
            className="skill-item px-[22px] py-[18px] hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[0_10px_32px_rgba(0,0,0,0.3)] hover:border-aurora2/25 transition-all duration-[350ms]"
            data-level={skill.level}
          >
            <div className="flex justify-between mb-2.5 text-[13px]">
              <span className="transition-colors duration-300">{skill.label}</span>
              <span className="text-aurora2 font-mono text-[12px]">{skill.level}%</span>
            </div>
            <div className="skill-bar">
              <span className="skill-fill" role="presentation" />
            </div>
            <meter
              className="sr-only"
              min="0"
              max="100"
              value={skill.level}
              aria-label={`Level ${skill.label}: ${skill.level}%`}
            />
          </GlassCard>
        ))}
      </ul>
    </section>
  )
}
