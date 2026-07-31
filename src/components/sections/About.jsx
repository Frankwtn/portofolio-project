/**
 * About.jsx
 * ─────────────────────────────────────────────────────────────
 * Section "Tentang Saya" — bio dan foto.
 *
 * LAYOUT:
 *   Grid dua kolom: teks bio (kiri, flex-1) + foto placeholder (kanan, 240px).
 *   Kolaps ke satu kolom di layar < md.
 *
 * REVEAL (3 animasi terpisah):
 *   1. .reveal — heading block (label + h2)
 *   2. .reveal — paragraf bio (3 paragraf)
 *   3. .reveal — GlassCard foto
 *   Ketiganya masing-masing trigger sendiri berdasarkan posisi scroll.
 *
 * CARA UPDATE:
 *   - Ganti teks di paragraf bio sesuai profil nyata
 *   - Ganti GlassCard placeholder dengan <img> foto sebenarnya
 *     (hapus aria-hidden dan tambah alt text)
 */

import GlassCard from '../shared/GlassCard'

export default function About() {
  return (
    <section id="about" className="px-[8vw] py-[clamp(48px,8vh,96px)] max-w-[1200px] mx-auto" aria-labelledby="about-heading">
      <div className="grid grid-cols-[1fr_240px] gap-12 items-start max-md:grid-cols-1">

        {/* Left */}
        <div className="flex flex-col">
          {/* Heading — reveal 1 */}
          <div className="reveal" data-delay="0">
            <p className="inline-flex items-center gap-2.5 text-[12px] text-aurora2 uppercase tracking-wide mb-[18px] font-mono before:content-[''] before:w-6 before:h-px before:bg-aurora2">
              Tentang Saya
            </p>
            <h2 id="about-heading" className="font-display text-[clamp(24px,3vw,40px)] font-semibold leading-[1.05] mb-[18px]">
              <span className="line"><span>Di balik layar</span></span>
              <span className="line"><span>setiap detail.</span></span>
            </h2>
          </div>

          {/* Body text — reveal 2 */}
          <div className="reveal text-[14px] leading-[1.7] text-muted space-y-3" data-delay="0">
            <p>Saya <strong className="text-text font-medium">Frank Emmanuel Wuaten</strong>, seorang Web Developer dan UIUX Designer dengan fokus di persimpangan antara User Research, Design dan Technology. Setelah lulus sebagai Sarjana Komputer Saya terus melakukan pengembangan Skill dengan mengikuti pelatihan dan juga bootcamp, serta mengerjakan project freelance.</p>
            <p>Pendekatan saya sederhana: setiap piksel dan setiap interaksi punya alasan untuk ada. Saya percaya animasi dan micro-interaction, jika digunakan dengan tepat, bisa membuat sebuah web terasa seperti punya kepribadian sendiri.</p>
            <p>Di luar layar, saya suka mengeksplorasi tipografi, design, dan hal-hal kecil yang jarang diperhatikan orang.</p>
          </div>
        </div>

        {/* Photo — reveal 3, independent */}
        <GlassCard
          className="reveal aspect-[3/4] overflow-hidden min-h-[220px] p-0"
          data-delay="0"
        >
          <img
            src="/certifications/logos/my-photo.jpeg"
            alt="Frank Emmanuel Wuaten"
            className="w-full h-full object-cover"
          />
        </GlassCard>
      </div>
    </section>
  )
}
