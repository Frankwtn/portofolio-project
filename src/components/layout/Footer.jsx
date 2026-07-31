/**
 * Footer.jsx
 * ─────────────────────────────────────────────────────────────
 * Footer sederhana — copyright + lokasi.
 *
 * ANIMASI:
 *   Footer memiliki class `.footer-visible` yang ditambahkan oleh useReveal
 *   saat footer mulai terlihat (r.top < vh * 0.98). CSS transition:
 *   opacity 0 → 1, translateY(28px) → translateY(0).
 *
 * Dipakai di: HomePage, ProjectsPage, CertificationsPage
 */

export default function Footer() {
  return (
    <footer
      className="px-[8vw] py-9 flex justify-between items-center border-t border-white/[0.09] text-muted text-[13px] flex-wrap gap-3 font-mono hover:border-white/15 transition-colors duration-300"
      aria-label="Footer"
    >
      {/* Hak cipta — update tahun jika perlu */}
      <small>© 2026 Frank Emmanuel Wuaten. Semua hak dilindungi.</small>
      {/* Lokasi */}
      <address className="not-italic hover:text-text transition-colors duration-300">
        Batam, Indonesia
      </address>
    </footer>
  )
}
