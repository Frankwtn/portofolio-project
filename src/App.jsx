/**
 * App.jsx
 * ─────────────────────────────────────────────────────────────
 * Root komponen — mendefinisikan semua route aplikasi.
 *
 * ROUTES:
 *   /                → HomePage       — halaman utama dengan semua sections
 *   /projects        → ProjectsPage   — semua proyek dengan filter
 *   /certifications  → CertificationsPage — semua sertifikasi
 *   *                → NotFoundPage   — halaman 404 untuk URL tidak dikenal
 *
 * CATATAN NAVIGASI:
 *   Link dari ProjectsPage/CertificationsPage ke "/" harus menyertakan
 *   state={{ skipPreloader: true }} agar preloader tidak tampil ulang.
 *   (Sudah di-handle di Navbar.jsx dan tombol Kembali di tiap page)
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage            from './pages/HomePage'
import ProjectsPage        from './pages/ProjectsPage'
import CertificationsPage  from './pages/CertificationsPage'
import NotFoundPage        from './pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"               element={<HomePage />} />
        <Route path="/projects"       element={<ProjectsPage />} />
        <Route path="/certifications" element={<CertificationsPage />} />
        <Route path="*"               element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
