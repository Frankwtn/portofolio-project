/**
 * PageLoader.jsx
 * ─────────────────────────────────────────────────────────────
 * Overlay transisi halaman ringan — mencegah flash of content
 * saat navigasi ke /projects atau /certifications.
 *
 * CARA KERJA:
 *   - Render full-screen div gelap (z-9990) saat halaman dimuat
 *   - Setelah 280ms, set visible = false → unmount (tidak ada fade karena
 *     opacity tidak berubah saat visible berubah — hanya unmount)
 *   - Efeknya: halaman muncul bersih tanpa konten berkedip
 *
 * CATATAN:
 *   Ini bukan spinner/loading indicator — tidak ada animasi berputar.
 *   Hanya cover singkat (~280ms) untuk menghindari FOUC (Flash of Unstyled Content)
 *   saat React hydrate halaman baru.
 *
 *   Dipakai di: ProjectsPage.jsx, CertificationsPage.jsx
 *   Tidak dipakai di: HomePage.jsx (menggunakan Preloader.jsx yang lebih lengkap)
 */

import { useEffect, useState } from 'react'

export default function PageLoader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Unmount setelah 280ms — cukup untuk konten selesai mount
    const t = setTimeout(() => setVisible(false), 280)
    return () => clearTimeout(t)
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[9990] pointer-events-none"
      style={{ background: 'var(--bg)' }}
      aria-hidden="true"
    />
  )
}
