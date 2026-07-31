/**
 * certifications.js
 * ─────────────────────────────────────────────────────────────
 * Data semua pelatihan dan sertifikat profesional.
 *
 * STRUKTUR TIAP OBJEK:
 * @typedef {Object} Certification
 * @property {string}   issuer    — Nama lembaga penerbit sertifikat
 * @property {string}   name      — Nama pelatihan / sertifikat
 * @property {string}   year      — Tahun diperoleh
 * @property {string}   letter    — Huruf awal untuk logo placeholder (1 karakter)
 * @property {string}   status    — Teks status badge ('Aktif' | 'Ongoing' | custom)
 * @property {boolean}  ongoing   — true = animasi certPulse pada badge, warna aurora3
 * @property {string}   logoGrad  — CSS gradient untuk background logo
 * @property {string}   desc      — Deskripsi isi pelatihan (ditampilkan di card back)
 * @property {string[]} skills    — Tag kemampuan spesifik yang dicakup
 * @property {string|null} imageUrl — Path foto sertifikat dari src/assets/certifications/
 *                                    Gunakan null jika foto belum tersedia.
 *                                    Contoh: '/src/assets/certifications/google-ux.jpg'
 *
 * CARA MENAMBAH:
 *   1. Simpan foto sertifikat ke src/assets/certifications/<nama-file>.jpg|png
 *   2. Tambah objek baru di akhir array, isi imageUrl dengan path tersebut.
 *   3. Pastikan ongoing: false jika pelatihan sudah selesai.
 */

export const CERTIFICATIONS = [
  {
    issuer: 'Hacktiv8',
    name: 'Studi Independen UI/UX',
    year: '2023',
    letter: 'H',
    status: 'Completed',
    ongoing: false,
    logoGrad: 'linear-gradient(135deg,rgba(66,133,244,0.3),rgba(52,168,83,0.25))',
    logoUrl: '/certifications/logos/logo-hacktiv8.jpg',
    desc: 'Kurikulum program mencakup riset pengguna, strategi desain, pembuatan wireframe, pengembangan prototype, dan proyek portofolio tim.',
    skills: ['UI Design','UX Research', 'Brainstorming', 'Wireframing', 'Prototyping', 'Figjam', 'Figma', 'Testing'],
    imageUrl: '/certifications/logos/certificate-hacktiv8.jpg'
  },
  {
    issuer: 'RevoU',
    name: 'Software Engineer Bootcamp',
    year: '2026',
    letter: 'R',
    status: 'Completed',
    ongoing: false,
    logoGrad: 'linear-gradient(135deg,rgba(0,132,255,0.3),rgba(0,100,230,0.2))',
    logoUrl: '/certifications/logos/logo-revou.jpg',
    desc: 'Pelatihan Software Engineer dasar menggunakan AI IDE Kiro.',
    skills: ['HTML', 'CSS tailwind', 'JavaScript'],
    imageUrl: '/certifications/logos/certificate-revou.jpg' 
  },
  {
    issuer: 'MySkill',
    name: 'Web and Apps Developer',
    year: '2026',
    letter: 'R',
    status: 'onGoing',
    ongoing: true,
    logoGrad: 'linear-gradient(135deg,rgba(0,132,255,0.3),rgba(0,100,230,0.2))',
    logoUrl: '/certifications/logos/logo-myskill.jpg',
    desc: 'Belajar & praktek materi tentang Front End, Back End dan Integration dari dasar hingga mahir. Mulai dari HTML, CSS, Javascript, React, VueJS, Golang, Python, Node.js, Git dan Github hingga Debugging.',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'VueJS', 'Golang', 'Python', 'Node.js', 'Git', 'Github'],
    imageUrl: null  
  }
]
