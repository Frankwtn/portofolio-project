/**
 * Experience.jsx
 * ─────────────────────────────────────────────────────────────
 * Section "Pengalaman" — timeline karier vertikal.
 *
 * LAYOUT TIMELINE:
 *   CSS grid 3 kolom: [konten kiri | titik tengah | konten kanan]
 *   - Titik timeline di kolom 2 (::before pada <li>)
 *   - Card bergantian kiri/kanan berdasarkan exp.side ('left' | 'right')
 *   - Garis vertikal via ::before pada <ol> (left: 50%, gradient putih → transparan)
 *   - Responsive <700px: layout menjadi 2 kolom [titik | konten]
 *
 * HOVER:
 *   Titik timeline membesar (scale 1.5), berubah warna aurora2, glow shadow.
 *   Card bergeser 5px ke arah tengah.
 *
 * REVEAL:
 *   Tiap <li> adalah .reveal terpisah — masuk satu per satu saat scroll.
 *
 * CARA MENAMBAH PENGALAMAN:
 *   Edit src/data/experience.js — tambah objek baru di awal array
 *   (urutan terbaru di atas). Atur side: 'left' atau 'right' bergantian.
 */

import { EXPERIENCE } from '../../data/experience'
import GlassCard from '../shared/GlassCard'

export default function Experience() {
  return (
    <section id="experience" className="px-[8vw] py-[clamp(48px,8vh,96px)] max-w-[1200px] mx-auto" aria-labelledby="experience-heading">
      <header className="flex justify-between items-end mb-7 flex-wrap gap-3">
        {/* Heading — reveal 1 */}
        <hgroup className="reveal" data-delay="0">
          <p className="inline-flex items-center gap-2.5 text-[12px] text-aurora2 uppercase tracking-wide mb-[18px] font-mono before:content-[''] before:w-6 before:h-px before:bg-aurora2">
            Pengalaman
          </p>
          <h2 id="experience-heading" className="font-display text-[clamp(24px,3vw,40px)] font-semibold">
            <span className="line"><span>Perjalanan karier.</span></span>
          </h2>
        </hgroup>
      </header>

      {/* Timeline — each card is an independent reveal */}
      <ol
        className="relative list-none m-0 p-0 before:content-[''] before:absolute before:left-1/2 before:top-0 before:bottom-0 before:w-px before:-translate-x-1/2 before:bg-gradient-to-b before:from-white/10 before:to-transparent max-[700px]:before:left-[5px] max-[700px]:before:translate-x-0"
        aria-label="Riwayat pekerjaan"
        reversed
      >
        {EXPERIENCE.map((exp, i) => (
          <li
            key={i}
            className={`reveal relative grid grid-cols-[1fr_48px_1fr] items-start pb-9 last:pb-0 max-[700px]:grid-cols-[28px_1fr]
              before:content-[''] before:col-start-2 before:row-start-1 before:justify-self-center before:mt-5 before:w-[11px] before:h-[11px] before:rounded-full before:bg-bg before:border-2 before:border-aurora2 before:z-10 before:transition-all before:duration-300
              hover:before:scale-150 hover:before:bg-aurora2 hover:before:shadow-[0_0_12px_var(--aurora-2)]
              max-[700px]:before:col-start-1`}
            data-delay="0"
          >
            <GlassCard
              className={`p-5 px-6 transition-all duration-[400ms] hover:shadow-[0_10px_32px_rgba(0,0,0,0.3)] hover:border-aurora2/25
                ${exp.side === 'right'
                  ? 'col-start-3 row-start-1 origin-left hover:translate-x-[5px]'
                  : 'col-start-1 row-start-1 origin-right hover:-translate-x-[5px]'}
                max-[700px]:col-start-2 max-[700px]:row-start-1 max-[700px]:hover:translate-x-1`}
            >
              <time className="font-mono text-[11px] text-aurora2 mb-1.5 block" dateTime={exp.datetime}>
                {exp.year}
              </time>
              <h3 className="text-[17px] font-semibold mb-1 transition-colors duration-300 hover:text-aurora2">{exp.role}</h3>
              <p className="font-mono text-[11px] text-muted mb-2 block">{exp.company}</p>
              <p className="text-muted text-[13px] leading-[1.6]">{exp.desc}</p>
            </GlassCard>
          </li>
        ))}
      </ol>
    </section>
  )
}
