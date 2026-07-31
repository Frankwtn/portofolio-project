/**
 * projects.js
 * ─────────────────────────────────────────────────────────────
 * Data semua proyek portofolio.
 *
 * STRUKTUR TIAP OBJEK:
 * @typedef {Object} Project
 * @property {number}   id      — Index unik (0-based), dipakai sebagai key React
 * @property {string}   title   — Nama proyek
 * @property {string}   desc    — Deskripsi singkat (1–2 kalimat)
 * @property {string[]} tags    — Label kategori yang ditampilkan di card
 * @property {string[]} tools   — Tools/teknologi yang digunakan (ditampilkan di modal & hover)
 * @property {string|string[]} lang — Bahasa pemrograman (string tunggal, koma, atau array)
 * @property {string}   year    — Tahun proyek
 * @property {string}   link    — URL proyek live atau repo (gunakan '#' jika belum ada)
 * @property {string}   thumb   — CSS gradient atau path foto (/projects/...) untuk thumbnail
 * @property {string[]} cats    — Kategori untuk filter di halaman /projects
 *                                Nilai valid: 'web' | 'mobile' | 'branding' | 'dashboard' | 'design'
 * @property {string[]} gallery — Array path foto atau CSS gradient untuk galeri di ProjectModal
 *
 * CARA MENAMBAH PROYEK:
 *   Tambah objek baru di akhir array PROJECTS dengan id unik.
 *   FEATURED_PROJECTS otomatis mengambil 5 proyek pertama untuk halaman Home.
 */

// @ts-nocheck

export const PROJECTS = [
  {
    id: 0,
    title: 'Heritage Nusantara',
    desc: 'Website Mobile First untuk memesan makanan menggunakan QR dan Admin Dashboard berbasis Desktop.',
    tags: ['Web Mobile First', 'Admin Dashboard Desktop'],
    tools: ['VSCode', 'Kiro IDE'],
    lang: ['JavaScript', 'HTML', 'React', 'CSS Tailwind'],
    year: '2026',
    link: 'https://heritage-nusantara-mawmnxe3n-steezy2.vercel.app/',
    thumb: '/projects/heritage-thumb.jpg',
    cats: ['Web Developper', 'Design'],
    gallery: [
      '/projects/heritage-1.jpg',
      '/projects/heritage-2.jpg',
    ],
  },
  {
    id: 1,
    title: 'User Research Medimate',
    desc: 'Brainstorming untuk melakukan mapping hasil Research dari user potensial dan merancang How Might We (HMW).',
    tags: ['Brainstorming', 'UI Design'],
    tools: ['Figjam'],
    lang: '-',
    year: '2023',
    link: 'https://www.figma.com/board/BlwGklAYYTWYO9Hs5pEYkx/Final-Chapter?node-id=0-1&p=f&t=GjF7XNJeGy1pF3oH-0',
    thumb: '/projects/medimate-thumb.jpg',
    cats: ['Brainstorming'],
    gallery: [
      'linear-gradient(135deg,rgba(108,92,231,0.45),rgba(255,107,157,0.35))',
      'linear-gradient(135deg,rgba(255,107,157,0.5),rgba(108,92,231,0.3))',
      'linear-gradient(135deg,rgba(255,107,157,0.3),rgba(0,217,192,0.4))',
    ],
  },
  {
    id: 2,
    title: 'Prototype Medimate',
    desc: 'Prototype interaktif aplikasi kesehatan medimate.',
    tags: ['Brainstorming', 'UI Design'],
    tools: ['Figjam'],
    lang: '-',
    year: '2023',
    link: 'https://www.figma.com/board/BlwGklAYYTWYO9Hs5pEYkx/Final-Chapter?node-id=0-1&p=f&t=GjF7XNJeGy1pF3oH-0',
    thumb: '/projects/medimate-thumb.jpg',
    cats: ['Design'],
    gallery: [
      '/projects/medimate-1.jpg',
      '/projects/medimate-2.jpg',
      '/projects/medimate-3.jpg',
    ],
  },
  {
    id: 3,
    title: 'Nama Proyek Empat',
    desc: 'Deskripsi singkat proyek — masalah yang dipecahkan dan hasil yang dicapai.',
    tags: ['Dashboard', 'Data Viz'],
    tools: ['Vue.js', 'D3.js', 'Supabase'],
    lang: 'JavaScript',
    year: '2022',
    link: '#',
    thumb: 'linear-gradient(135deg,rgba(255,107,157,0.35),rgba(0,217,192,0.25))',
    cats: ['dashboard', 'web'],
    gallery: [
      'linear-gradient(135deg,rgba(255,107,157,0.45),rgba(0,217,192,0.3))',
      'linear-gradient(135deg,rgba(0,217,192,0.4),rgba(255,107,157,0.3))',
      'linear-gradient(135deg,rgba(255,107,157,0.3),rgba(108,92,231,0.4))',
    ],
  },
  {
    id: 4,
    title: 'Nama Proyek Lima',
    desc: 'Deskripsi singkat proyek — masalah yang dipecahkan dan hasil yang dicapai.',
    tags: ['E-Commerce', 'React'],
    tools: ['Next.js', 'Stripe', 'Prisma'],
    lang: 'TypeScript',
    year: '2022',
    link: '#',
    thumb: 'linear-gradient(135deg,rgba(108,92,231,0.3),rgba(255,107,157,0.4))',
    cats: ['web'],
    gallery: [
      'linear-gradient(135deg,rgba(108,92,231,0.45),rgba(255,107,157,0.4))',
      'linear-gradient(135deg,rgba(255,107,157,0.4),rgba(108,92,231,0.35))',
      'linear-gradient(135deg,rgba(108,92,231,0.35),rgba(0,217,192,0.3))',
    ],
  },
  {
    id: 5,
    title: 'Nama Proyek Enam',
    desc: 'Deskripsi singkat proyek — masalah yang dipecahkan dan hasil yang dicapai.',
    tags: ['UI Design', 'Branding'],
    tools: ['Figma', 'Adobe XD'],
    lang: 'Design',
    year: '2022',
    link: '#',
    thumb: 'linear-gradient(135deg,rgba(0,217,192,0.35),rgba(255,107,157,0.35))',
    cats: ['design', 'branding'],
    gallery: [
      'linear-gradient(135deg,rgba(0,217,192,0.45),rgba(255,107,157,0.35))',
      'linear-gradient(135deg,rgba(255,107,157,0.4),rgba(0,217,192,0.35))',
      'linear-gradient(135deg,rgba(0,217,192,0.3),rgba(108,92,231,0.4))',
    ],
  },
  {
    id: 6,
    title: 'Nama Proyek Tujuh',
    desc: 'Deskripsi singkat proyek — masalah yang dipecahkan dan hasil yang dicapai.',
    tags: ['Mobile App', 'UI Design'],
    tools: ['React Native', 'TypeScript'],
    lang: 'TypeScript',
    year: '2021',
    link: '#',
    thumb: 'linear-gradient(135deg,rgba(255,107,157,0.4),rgba(108,92,231,0.3))',
    cats: ['mobile', 'design'],
    gallery: [
      'linear-gradient(135deg,rgba(255,107,157,0.45),rgba(108,92,231,0.35))',
      'linear-gradient(135deg,rgba(108,92,231,0.4),rgba(255,107,157,0.3))',
      'linear-gradient(135deg,rgba(255,107,157,0.3),rgba(0,217,192,0.35))',
    ],
  },
  {
    id: 7,
    title: 'Nama Proyek Delapan',
    desc: 'Deskripsi singkat proyek — masalah yang dipecahkan dan hasil yang dicapai.',
    tags: ['Dashboard', 'Vue.js'],
    tools: ['Vue.js', 'Chart.js', 'Node.js'],
    lang: 'JavaScript',
    year: '2021',
    link: '#',
    thumb: 'linear-gradient(135deg,rgba(108,92,231,0.45),rgba(0,217,192,0.4))',
    cats: ['dashboard'],
    gallery: [
      'linear-gradient(135deg,rgba(108,92,231,0.5),rgba(0,217,192,0.4))',
      'linear-gradient(135deg,rgba(0,217,192,0.45),rgba(108,92,231,0.35))',
      'linear-gradient(135deg,rgba(108,92,231,0.35),rgba(255,107,157,0.3))',
    ],
  },
  {
    id: 8,
    title: 'Nama Proyek Sembilan',
    desc: 'Deskripsi singkat proyek — masalah yang dipecahkan dan hasil yang dicapai.',
    tags: ['Web App', 'Branding'],
    tools: ['Nuxt.js', 'Strapi', 'Figma'],
    lang: 'JavaScript',
    year: '2021',
    link: '#',
    thumb: 'linear-gradient(135deg,rgba(0,217,192,0.45),rgba(255,107,157,0.3))',
    cats: ['web', 'branding'],
    gallery: [
      'linear-gradient(135deg,rgba(0,217,192,0.5),rgba(255,107,157,0.35))',
      'linear-gradient(135deg,rgba(255,107,157,0.4),rgba(0,217,192,0.35))',
      'linear-gradient(135deg,rgba(0,217,192,0.35),rgba(108,92,231,0.4))',
    ],
  },
]

/** 5 proyek pertama — ditampilkan di section Projects di halaman Home. */
export const FEATURED_PROJECTS = PROJECTS.slice(0, 5)
