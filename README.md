# Frank Wuaten — Creative Developer Portfolio (React + Vite)

Portofolio pribadi Frank Emmanuel Wuaten, seorang Creative Developer & Digital Designer. Versi ini dibangun menggunakan **React 19**, **Vite**, **Tailwind CSS**, dan **React Router DOM v7**.

---

## 🚀 Fitur Utama

- **Modern React Architecture**: Komponen modular dengan pembagian tanggung jawab yang jelas (`sections`, `layout`, `shared`, `pages`).
- **Custom Animation Hooks**:
  - `useReveal`: Scroll-driven reveal animation system berbasis `requestAnimationFrame` (rAF) dengan 3-state machine (`below`, `visible`, `above`).
  - `useCursor`: Custom cursor interaktif dengan efek magnetic pull, ring, label hover, dan cursor preview tooltip.
  - `usePreloader`: Intro animation sequence dengan scramble text DaVinci-style dan curtain reveal.
  - `useAurora`: Ambient canvas background dengan animasi fluid blob gradient.
  - `useScramble`: Text scramble effect saat hover pada heading/elemen teks.
  - `useSmoothScroll`: Custom smooth scrolling dengan interpolasi momentum.
- **Client-side Routing**:
  - `/` → `HomePage` (Hero, About, Skills, Experience, Projects, Certifications, Now, Contact)
  - `/projects` → `ProjectsPage` (Grid semua proyek dengan filter kategori & modal detail)
  - `/certifications` → `CertificationsPage` (Daftar semua sertifikasi dengan flip card 3D)
  - `*` → `NotFoundPage` (Halaman 404)
- **Data Management Centralized**: Semua data proyek, sertifikasi, pengalaman, dan skill tersimpan rapi di folder `src/data/`.
- **Responsive & Dynamic Design**: Desain glassmorphism, liquid glass navbar, animasi fluid, dan penanganan layar mobile hingga desktop.

---

## 📁 Struktur File

```
portfolio-react/
├── public/                 # File statis (gambar proyek, aset sertifikat, favicon)
├── src/
│   ├── assets/             # Aset gambar/logo internal
│   ├── components/         # Komponen React
│   │   ├── layout/         # Komponen layout (Navbar, Footer, MobileMenu, Preloader)
│   │   ├── sections/       # Section halaman utama (Hero, About, Skills, Experience, Projects, Certifications, Now, Contact)
│   │   └── shared/         # Komponen UI reusable (GlassCard, CustomCursor, ProjectModal, CertificationModal, dll.)
│   ├── data/               # File JSON/JS data (projects.js, certifications.js, experience.js, skills.js)
│   ├── hooks/              # Custom React Hooks (useReveal.js, useCursor.js, usePreloader.js, useAurora.js, dll.)
│   ├── pages/              # Komponen Halaman (HomePage, ProjectsPage, CertificationsPage, NotFoundPage)
│   ├── App.jsx             # Konfigurasi Route utama
│   ├── main.jsx            # Entry point React
│   ├── index.css           # Design system, styling global, utilities, & animasi CSS
│   └── App.css             # Style spesifik App
├── index.html              # HTML entry point Vite
├── tailwind.config.js      # Konfigurasi Tailwind CSS
├── vite.config.js          # Konfigurasi Vite
└── package.json            # Dependencies dan skrip proyek
```

---

## 🛠️ Cara Menjalankan Proyek

### 1. Prasyarat
Pastikan **Node.js** (versi 18+) sudah terinstal di komputer Anda.

### 2. Instalasi Dependencies
Jalankan perintah berikut di terminal pada folder `portfolio-react`:

```bash
npm install
```

### 3. Mode Pengembangan (Development)
Untuk menjalankan server lokal dengan Hot Module Replacement (HMR):

```bash
npm run dev
```
Buka URL yang tampil di terminal (biasanya `http://localhost:5173`).

### 4. Build Production
Untuk mengompilasi proyek menjadi bundel produksi yang dioptimalkan:

```bash
npm run build
```
Hasil build akan tersimpan di folder `dist/`.

### 5. Preview Build Production
Untuk menguji hasil build secara lokal sebelum di-deploy:

```bash
npm run preview
```

### 6. Linting
Untuk memeriksa kualitas kode dengan ESLint:

```bash
npm run lint
```
