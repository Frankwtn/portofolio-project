/**
 * skills.js
 * ─────────────────────────────────────────────────────────────
 * Data keahlian untuk Skills section dengan progress bar.
 *
 * STRUKTUR TIAP OBJEK:
 * @typedef {Object} Skill
 * @property {string} label — Nama keahlian yang ditampilkan
 * @property {number} level — Persentase (0–100), dipakai untuk:
 *                            - Lebar .skill-fill (CSS width %)
 *                            - Nilai <meter> element
 *                            - Teks persentase di samping label
 *
 * CARA KERJA ANIMASI:
 *   Nilai `level` dibaca oleh useReveal.js via atribut data-level pada .skill-item.
 *   Saat elemen masuk viewport → animateSkills() dijalankan →
 *   .skill-fill width di-animate dari 0% ke level%.
 *
 * CARA MENAMBAH:
 *   Tambah objek baru. Grid otomatis menyesuaikan (2 kolom di desktop, 1 di mobile).
 */

export const SKILLS = [
  { label: 'UI / UX Design',              level: 85 },
  { label: 'Software Development',         level: 80 },
  { label: 'Motion & Animasi',             level: 80 },
  { label: 'Branding & Identitas Visual',  level: 75 },
]
