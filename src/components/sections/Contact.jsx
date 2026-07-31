/**
 * Contact.jsx
 * ─────────────────────────────────────────────────────────────
 * Section kontak — email + copy button + social links grid.
 *
 * KOMPONEN INTERNAL:
 *   Toast({ msg, type }) — notifikasi kecil di bawah layar, auto-hide 3.5s
 *   SocialButton({ item, idx }) — tombol sosial dengan icon + hover color per platform
 *
 * FUNGSI UTAMA:
 *   copyEmail() — salin email ke clipboard via navigator.clipboard.writeText
 *                 Tampilkan toast sukses/error setelahnya
 *
 * SOCIAL LINKS:
 *   ICONS     — map key → SVG element (GitHub, Gmail, Instagram, LinkedIn, Figma, Canva)
 *   SOCIALS   — array konfigurasi: key, label, href, color (hex warna brand)
 *   Layout    — 2 baris × 3 tombol (slice 0–3, slice 3–6)
 *   Hover     — warna border, teks, dan box-shadow sesuai warna brand per platform
 *               Icon rotate(-8deg) + scale(1.2) saat hover
 *
 * REVEAL:
 *   - heading block: .reveal delay 0
 *   - paragraf: .reveal delay 120
 *   - email + copy: .reveal delay 240
 *   - nav sosial: .reveal delay 360
 *
 * CARA UPDATE:
 *   - Ganti email di copyEmail() dan di href mailto:
 *   - Ganti href di SOCIALS dengan URL profil nyata
 *   - Tambah/kurangi item di SOCIALS (grid otomatis menyesuaikan)
 */

import { useState } from 'react'

function Toast({ msg, type }) {
  if (!msg) return null
  return (
    <div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-2.5 px-5 py-3 rounded-full font-mono text-[12px] backdrop-blur-md border transition-all duration-300"
      style={{
        background: type === 'success' ? 'rgba(0,217,192,0.12)' : 'rgba(255,107,157,0.12)',
        borderColor: type === 'success' ? 'rgba(0,217,192,0.3)' : 'rgba(255,107,157,0.3)',
        color: type === 'success' ? 'var(--aurora-2)' : 'var(--aurora-3)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      }}
      role="status" aria-live="polite"
    >
      <span>{type === 'success' ? '✓' : '✕'}</span>
      {msg}
    </div>
  )
}

/* ── SVG Icons ─────────────────────────────────────────── */
const ICONS = {
  GitHub: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
    </svg>
  ),
  Gmail: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.272H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.642l8.073-6.149C21.69 2.279 24 3.434 24 5.457z"/>
    </svg>
  ),
  Instagram: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  ),
  LinkedIn: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  Figma: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019h3.117V8.981H8.148zm4.587 13.51c0 2.476-2.014 4.49-4.49 4.49s-4.49-2.014-4.49-4.49 2.014-4.49 4.49-4.49h4.49v4.49zm-4.49-3.019c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019 3.019-1.354 3.019-3.019v-3.019H8.245zm7.607-3.019c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49 4.49 2.014 4.49 4.49-2.014 4.49-4.49 4.49zm0-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019 3.019-1.354 3.019-3.019-1.354-3.019-3.019-3.019z"/>
    </svg>
  ),
  Canva: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.759 16.507a5.853 5.853 0 01-2.998.82c-3.232 0-5.765-2.532-5.765-5.764 0-3.233 2.533-5.765 5.765-5.765 1.49 0 2.846.563 3.868 1.49l-1.303 1.481a3.593 3.593 0 00-2.565-1.072 3.594 3.594 0 00-3.594 3.593 3.594 3.594 0 003.594 3.594c.84 0 1.615-.29 2.226-.77l1.294 1.393z"/>
    </svg>
  ),
}

const SOCIALS = [
  { key: 'GitHub',    label: 'GitHub',    href: 'https://github.com/',    color: '#f0f6fc' },
  { key: 'Gmail',     label: 'Gmail',     href: 'mailto:frankwuaten2572@gmail.com', color: '#EA4335' },
  { key: 'Instagram', label: 'Instagram', href: 'https://instagram.com/', color: '#E1306C' },
  { key: 'LinkedIn',  label: 'LinkedIn',  href: 'https://linkedin.com/',  color: '#0A66C2' },
  { key: 'Figma',     label: 'Figma',     href: 'https://figma.com/',     color: '#a259ff' },
  { key: 'Canva',     label: 'Canva',     href: 'https://canva.com/',     color: '#00C4CC' },
]

function SocialButton({ item, idx }) {
  const [hovered, setHovered] = useState(false)
  const row = Math.floor(idx / 3)
  const delay = `${row * 80 + (idx % 3) * 60}ms`

  return (
    <a
      href={item.href}
      target={item.href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="glass flex items-center gap-2.5 px-4 py-2.5 text-[12px] font-mono transition-all duration-[350ms] hover:-translate-y-1.5 hover:scale-105 cursor-pointer"
      style={{
        transitionDelay: hovered ? '0ms' : delay,
        borderColor: hovered ? `${item.color}55` : undefined,
        color: hovered ? item.color : undefined,
        boxShadow: hovered ? `0 8px 24px ${item.color}20` : undefined,
      }}
      data-magnetic
      aria-label={item.label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className="transition-transform duration-300"
        style={{ transform: hovered ? 'scale(1.2) rotate(-8deg)' : 'scale(1) rotate(0deg)' }}
        aria-hidden="true"
      >
        {ICONS[item.key]}
      </span>
      {item.label}
    </a>
  )
}

export default function Contact() {
  const [toast, setToast] = useState({ msg: '', type: 'success' })

  function showToast(msg, type = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast({ msg: '', type: 'success' }), 3500)
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText('frankwuaten2572@gmail.com')
      showToast('Email disalin ke clipboard!')
    } catch {
      showToast('Gagal menyalin email', 'error')
    }
  }

  const rows = [SOCIALS.slice(0, 3), SOCIALS.slice(3, 6)]

  return (
    <section id="contact" className="px-[8vw] py-[clamp(48px,8vh,96px)] max-w-[1200px] mx-auto" aria-labelledby="contact-heading">
      <Toast msg={toast.msg} type={toast.type} />

      <article className="text-center">
        <div className="reveal" data-delay="0">
          <p className="inline-flex items-center justify-center gap-2.5 text-[12px] text-aurora2 uppercase tracking-wide mb-[18px] font-mono before:content-[''] before:w-6 before:h-px before:bg-aurora2">
            Kontak
          </p>
          <h2 id="contact-heading" className="font-display font-bold mb-[18px]" style={{ fontSize: 'clamp(28px,5vw,56px)' }}>
            <span className="line"><span>Mari buat</span></span>
            <span className="line"><span>sesuatu bersama.</span></span>
          </h2>
        </div>

        <p className="reveal text-muted text-[15px] mb-8 max-w-[420px] mx-auto" data-delay="120">
          Punya proyek, ide, atau sekadar ingin menyapa? Kotak masuk saya selalu terbuka.
        </p>

        {/* Email + copy */}
        <div className="reveal inline-flex items-center gap-3 mb-9" data-delay="240">
          <a
            href="mailto:frankwuaten2572@gmail.com"
            className="font-display font-semibold relative pb-1.5 transition-all duration-300 hover:text-aurora2 hover:tracking-[0.01em]"
            style={{ fontSize: 'clamp(16px,2.2vw,26px)' }}
          >
            frankwuaten2572@gmail.com
            <span className="absolute bottom-0 left-0 w-full h-px bg-white/10 transition-colors duration-300 hover:bg-aurora2" />
          </a>
          <button
            onClick={copyEmail}
            className="flex-shrink-0 w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-muted hover:text-aurora2 hover:border-aurora2/40 transition-all duration-300 cursor-pointer"
            aria-label="Salin alamat email"
            title="Salin email"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
          </button>
        </div>

        {/* Social links — 3 per row */}
        <nav className="reveal flex flex-col items-center gap-3" data-delay="360" aria-label="Media sosial dan platform">
          {rows.map((row, ri) => (
            <div key={ri} className="flex gap-3 justify-center flex-wrap">
              {row.map((item, i) => (
                <SocialButton key={item.key} item={item} idx={ri * 3 + i} />
              ))}
            </div>
          ))}
        </nav>
      </article>
    </section>
  )
}
