/**
 * Hero.jsx
 * ─────────────────────────────────────────────────────────────
 * Section pertama halaman utama — pengenalan dan CTA.
 *
 * LAYOUT:
 *   Full-height (min-h-screen), flex-col dengan flex-1 untuk centering vertikal.
 *   - Badge "Terbuka untuk proyek baru" (fadeUp delay .75s)
 *   - H1 dua baris dengan animasi lineUp (masuk dari bawah per baris)
 *     Baris 1: teks solid. Baris 2: outline (transparent fill, stroke)
 *   - Paragraf deskripsi (fadeUp delay 1.55s)
 *   - Nav dua tombol CTA: "Lihat Proyek Saya" → #projects, "Mari Berbicara" → #contact
 *   - Scroll hint di paling bawah (mt-auto) dengan animasi garis bergerak
 *
 * ANIMASI:
 *   Semua animasi berbasis CSS keyframe inline (bukan useReveal).
 *   Diblokir oleh CSS body:not(.intro-done) sampai preloader selesai.
 *   Saat hero di-scroll keluar, useReveal menambah class .hero-exited
 *   yang men-trigger exit animation pada semua elemen hero.
 *
 * Tidak ada state/hooks/data imports — pure presentational.
 */

export default function Hero() {
  return (
    <section
      className="hero min-h-screen flex flex-col px-[8vw] max-w-[1200px] mx-auto pt-[140px] pb-10 relative"
      id="hero"
      aria-label="Pengenalan"
    >
      <div className="flex flex-col justify-center flex-1">
          <p
            className="hero-tag glass inline-flex gap-2 items-center px-3.5 py-1.5 rounded-full text-[11px] text-muted mb-5 w-fit opacity-0 hover:border-aurora2/30 hover:bg-aurora2/5 transition-all duration-300"
            style={{ animation: 'fadeUp 1s ease forwards .75s' }}
            role="status"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-aurora2 shadow-[0_0_10px_var(--aurora-2)]" style={{ animation: 'pulse2 2s infinite' }} aria-hidden="true" />
            Terbuka untuk proyek baru
          </p>

          <h1
            className="font-display text-[clamp(36px,6.5vw,80px)] font-bold leading-[0.95] mb-[18px]"
          >
            <span className="line">
              <span style={{ display: 'inline-block', transform: 'translateY(110%)', animation: 'lineUp 1.3s cubic-bezier(.16,1,.3,1) forwards .95s' }}>
                Web Developer
              </span>
            </span>
            <span className="line">
              <span style={{ display: 'inline-block', transform: 'translateY(110%)', animation: 'lineUp 1.3s cubic-bezier(.16,1,.3,1) forwards 1.15s', color: 'transparent', WebkitTextStroke: '1.5px var(--text)' }}>
                &amp; Creative UI Designer
              </span>
            </span>
          </h1>

          <p
            className="hero sub text-[clamp(14px,1.5vw,17px)] text-muted max-w-[500px] mb-8 opacity-0"
            style={{ animation: 'fadeUp 1.1s ease forwards 1.55s' }}
          >
            Saya membangun pengalaman digital yang detail, ekspresif, dan terasa hidup —
            memadukan desain visual dengan interaksi yang halus.
          </p>

          <nav
            className="hero-actions flex gap-3 flex-wrap opacity-0"
            style={{ animation: 'fadeUp 1.1s ease forwards 1.8s' }}
            aria-label="Aksi utama"
          >
            <a
              href="#projects"
              className="hero-btn-primary inline-flex items-center gap-2 px-[22px] py-[11px] rounded-full text-[13px] font-medium bg-white/8 border border-white/10 backdrop-blur-md hover:border-aurora2 hover:bg-aurora2/10 hover:-translate-y-0.5 transition-all duration-300"
              data-magnetic
            >
              Lihat Proyek Saya
            </a>
            <a
              href="#contact"
              className="hero-btn-ghost inline-flex items-center gap-2 px-[22px] py-[11px] rounded-full text-[13px] font-medium border border-white/10 text-muted hover:text-text hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300"
              data-magnetic
            >
              Mari Berbicara →
            </a>
          </nav>
        </div>

      <p
        className="scroll-hint flex items-center gap-2.5 text-[11px] text-muted mt-auto pt-6 opacity-0 cursor-default"
        style={{ animation: 'fadeUp 1.1s ease forwards 2.1s' }}
        aria-hidden="true"
      >
        <span className="w-px h-7 relative overflow-hidden" style={{ background: 'linear-gradient(var(--text-muted), transparent)' }}>
          <span className="absolute top-[-100%] left-0 w-full h-full bg-aurora2" style={{ animation: 'scrollLine 2s infinite' }} />
        </span>
        <span className="font-mono">SCROLL</span>
      </p>
    </section>
  )
}
