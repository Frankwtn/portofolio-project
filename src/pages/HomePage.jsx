/**
 * HomePage.jsx
 * ─────────────────────────────────────────────────────────────
 * Halaman utama portofolio (route "/").
 *
 * STRUKTUR KOMPONEN:
 *   HomePage (shell, tidak ada state/hooks)
 *   └── AuroraBackground  — canvas aurora di z-0
 *   └── Preloader         — animasi intro (usePreloader hook)
 *   └── Cursor            — custom cursor (useCursor hook)
 *   └── Navbar            — navbar tanpa isProjectsPage prop
 *   └── HomePageInner     — semua sections + footer
 *         ├── useReveal()       — scroll reveal untuk semua sections
 *         ├── useSmoothScroll() — smooth scroll wheel
 *         ├── useScramble()     — efek scramble teks pada heading hover
 *         └── Sections: Hero, About, Skills, Experience, Projects,
 *                       Certifications, Now, Contact
 *         └── Footer
 *
 * CATATAN:
 *   HomePageInner dipisahkan agar hooks (useReveal, useSmoothScroll, useScramble)
 *   hanya berjalan setelah semua sections di-mount. Shell HomePage tidak punya
 *   state/hooks sehingga tidak ada re-render yang tidak perlu.
 */

import AuroraBackground from '../components/layout/AuroraBackground'
import Cursor           from '../components/layout/Cursor'
import Preloader        from '../components/layout/Preloader'
import Navbar           from '../components/layout/Navbar'
import Footer           from '../components/layout/Footer'
import Hero             from '../components/sections/Hero'
import About            from '../components/sections/About'
import Skills           from '../components/sections/Skills'
import Experience       from '../components/sections/Experience'
import Projects         from '../components/sections/Projects'
import Certifications   from '../components/sections/Certifications'
import Now              from '../components/sections/Now'
import Contact          from '../components/sections/Contact'
import { useReveal }        from '../hooks/useReveal'
import { useSmoothScroll }  from '../hooks/useSmoothScroll'
import { useScramble }      from '../hooks/useScramble'

/**
 * Inner component yang menjalankan semua hooks dan merender sections.
 * Dipisahkan dari HomePage agar semua sections sudah di-mount saat hooks jalan.
 */
function HomePageInner() {
  useReveal()       // scroll-driven reveal untuk semua .reveal/.stagger
  useSmoothScroll() // smooth wheel scroll
  useScramble()     // scramble teks pada hover heading

  return (
    <div className="relative z-[2]">
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Now />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <AuroraBackground />
      <Preloader />
      <Cursor />
      <Navbar />
      <HomePageInner />
    </>
  )
}
