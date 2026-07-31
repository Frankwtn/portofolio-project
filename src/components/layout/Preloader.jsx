/**
 * Preloader.jsx
 * ─────────────────────────────────────────────────────────────
 * Render struktur DOM untuk animasi intro preloader.
 * Semua logika animasi ada di usePreloader() hook.
 *
 * STRUKTUR DOM:
 *   #preloader         — container utama (fixed, full-screen, z-9999)
 *   .pre-name          — elemen teks untuk animasi scramble nama
 *   .pre-bar-wrap      — wrapper progress bar
 *   #preBar            — progress bar aktual (width di-animate 0% → 100%)
 *   #prePct            — teks persentase ('0%' → '100%')
 *   #curtainTop        — panel tirai atas (transform: translateY(0) → translateY(-101%))
 *   #curtainBottom     — panel tirai bawah (transform: translateY(0) → translateY(101%))
 *
 * CSS CLASSES (dikelola oleh usePreloader):
 *   #preloader.done    — fade out (opacity 0, visibility hidden)
 *   #curtainTop.open   — tirai naik (translateY(-101%))
 *   #curtainBottom.open — tirai turun (translateY(101%))
 *   body.intro-done    — aktifkan animasi hero dan reveal
 *
 * Dipakai di: HomePage.jsx saja.
 */

import { usePreloader } from '../../hooks/usePreloader'

export default function Preloader() {
  usePreloader()

  return (
    <>
      {/* Layar preloader utama */}
      <aside id="preloader" aria-hidden="true" aria-label="Memuat halaman">
        {/* Nama yang di-scramble oleh usePreloader */}
        <p className="pre-name display" aria-live="polite" />

        {/* Progress bar */}
        <div className="pre-bar-wrap" aria-hidden="true">
          <div className="pre-bar" id="preBar" />
        </div>

        {/* Persentase loading */}
        <output className="pre-pct font-mono" id="prePct">0%</output>
      </aside>

      {/* Panel tirai untuk transisi masuk ke halaman */}
      <div className="curtain curtain-top"    id="curtainTop"    aria-hidden="true" />
      <div className="curtain curtain-bottom" id="curtainBottom" aria-hidden="true" />
    </>
  )
}
