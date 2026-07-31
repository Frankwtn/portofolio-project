/**
 * NotFoundPage.jsx
 * ─────────────────────────────────────────────────────────────
 * Halaman 404 — ditampilkan untuk semua URL yang tidak cocok dengan route manapun.
 *
 * TAMPILAN:
 *   - Label kecil "404 — Halaman tidak ditemukan"
 *   - Angka "404" besar dengan gaya outline (transparent fill, white stroke)
 *   - Teks penjelasan
 *   - Tombol kembali ke beranda
 *
 * ANIMASI:
 *   Semua elemen menggunakan inline fadeUp keyframe dengan staggered delay:
 *   0.1s → 0.2s → 0.32s → 0.44s
 *   Tidak menggunakan useReveal (tidak perlu scroll reveal di halaman ini).
 *
 * LAYOUT:
 *   Tidak menggunakan Navbar, Footer, atau PageLoader.
 *   Hanya AuroraBackground + Cursor + konten centered.
 */

import { Link } from 'react-router-dom'
import AuroraBackground from '../components/layout/AuroraBackground'
import Cursor from '../components/layout/Cursor'

export default function NotFoundPage() {
  return (
    <>
      <AuroraBackground />
      <Cursor />
      <main className="min-h-screen flex flex-col items-center justify-center px-[8vw] text-center relative z-[2]">
        {/* Label 404 */}
        <p
          className="font-mono text-[11px] text-aurora2 uppercase tracking-[0.2em] mb-6 opacity-0"
          style={{ animation: 'fadeUp 0.8s ease forwards 0.1s' }}
        >
          404 — Halaman tidak ditemukan
        </p>

        {/* Angka besar outline */}
        <h1
          className="font-display font-bold leading-[0.95] mb-6 opacity-0"
          style={{
            fontSize: 'clamp(80px,15vw,180px)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255,255,255,0.08)',
            animation: 'fadeUp 0.9s ease forwards 0.2s',
          }}
        >
          404
        </h1>

        {/* Deskripsi */}
        <p
          className="text-muted text-[15px] max-w-[360px] mb-10 opacity-0"
          style={{ animation: 'fadeUp 0.9s ease forwards 0.32s' }}
        >
          Halaman yang kamu cari tidak ada, mungkin sudah dipindahkan atau URL-nya salah.
        </p>

        {/* Tombol kembali */}
        <Link
          to="/"
          className="opacity-0 inline-flex items-center gap-2 px-6 py-3 rounded-full font-mono text-[13px] border border-white/10 text-muted hover:text-aurora2 hover:border-aurora2/40 hover:-translate-y-0.5 transition-all duration-300"
          style={{ animation: 'fadeUp 0.9s ease forwards 0.44s' }}
          data-magnetic
        >
          ← Kembali ke Beranda
        </Link>
      </main>
    </>
  )
}
