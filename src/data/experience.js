/**
 * experience.js
 * ─────────────────────────────────────────────────────────────
 * Data riwayat pengalaman kerja untuk Timeline section.
 *
 * STRUKTUR TIAP OBJEK:
 * @typedef {Object} Experience
 * @property {string} year     — Rentang tahun tampilan (contoh: '2024 — Sekarang')
 * @property {string} datetime — Nilai ISO untuk atribut dateTime pada <time> (aksesibilitas)
 * @property {string} role     — Jabatan / posisi
 * @property {string} company  — Nama perusahaan / klien
 * @property {string} desc     — Deskripsi tanggung jawab dan pencapaian
 * @property {'left'|'right'} side — Kolom timeline: 'left' = kiri, 'right' = kanan
 *
 * LAYOUT TIMELINE:
 *   Experience.jsx menggunakan CSS grid 3 kolom (kiri | titik | kanan).
 *   Properti `side` menentukan apakah card berada di kolom 1 (kiri) atau 3 (kanan).
 *   Idealnya bergantian left/right untuk tampilan yang seimbang.
 *
 * CARA MENAMBAH:
 *   Tambah objek baru di awal array (urutan terbaru di atas).
 */

export const EXPERIENCE = [
  {
    year: '2025 — sekarang',
    datetime: '2023/202',
    role: 'Freelance Designer & Developer',
    company: 'Independent',
    desc: 'Mengerjakan proyek personal branding, landing page, dan portofolio untuk berbagai klien individu.',
    side: 'right',
  },
  {
    year: '2023',
    datetime: '2023',
    role: 'Independent Study Participant',
    company: 'PT Hacktivate Teknologi Indonesia (Hacktiv8)',
    desc: 'Mengerjakan proyek. Melakukan analisis kebutuhan user, membuat wireframe, hingga prototype dan testing.',
    side: 'left',
  },
]
