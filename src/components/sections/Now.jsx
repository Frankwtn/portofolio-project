/**
 * Now.jsx
 * ─────────────────────────────────────────────────────────────
 * Section "Sedang Berjalan" (/now) — status aktivitas terkini.
 *
 * KONSEP:
 *   Menampilkan apa yang sedang dikerjakan, dipelajari, dan dibaca saat ini.
 *   Terinspirasi dari konsep /now page (nownownow.com).
 *
 * LAYOUT:
 *   GlassCard (.now-card) sebagai container utama dengan state machine
 *   reveal tersendiri di useReveal.js (bukan bagian dari revealEls biasa).
 *   Di dalamnya: heading (.reveal) + grid 3 item (.now-grid.stagger).
 *
 * DATA:
 *   NOW_ITEMS didefinisikan inline (bukan file data terpisah) karena
 *   konten ini diubah secara manual dan tidak perlu diimpor dari tempat lain.
 *
 * CARA UPDATE:
 *   Edit objek di NOW_ITEMS (heading + body) sesuai aktivitas terkini.
 *   Tidak perlu mengubah komponen sama sekali.
 */

import GlassCard from '../shared/GlassCard'

const NOW_ITEMS = [
  {
    heading: 'Sedang membangun',
    body: 'Website Source code untuk template Animasi dan Navigation.',
  },
  {
    heading: 'Sedang Pelatihan di Myskill',
    body: 'Pelatihan Website and Apps Development.',
  },
]

export default function Now() {
  return (
    <section className="px-[8vw] pt-0 pb-[clamp(48px,8vh,96px)] max-w-[1200px] mx-auto" id="now" aria-labelledby="now-heading">
      <GlassCard className="now-card p-10 px-10">
        {/* Heading — reveal 1 */}
        <div className="reveal" data-delay="0">
          <p className="inline-flex items-center gap-2.5 text-[12px] text-aurora2 uppercase tracking-wide mb-4 font-mono before:content-[''] before:w-6 before:h-px before:bg-aurora2">
            Sedang Berjalan — /now
          </p>
          <h2
            id="now-heading"
            className="font-display font-semibold"
            style={{ fontSize: 'clamp(26px,3.5vw,38px)' }}
          >
            <span className="line"><span>Apa yang sedang saya kerjakan.</span></span>
          </h2>
        </div>

        {/* Each now card — stagger grid */}
        <ul className="now-grid stagger grid grid-cols-3 gap-6 mt-6 list-none p-0 max-[800px]:grid-cols-1" role="list" aria-label="Aktivitas saat ini">
          {NOW_ITEMS.map((item) => (
            <li
              key={item.heading}
              className="p-4 rounded-[10px] transition-all duration-[350ms] cursor-default hover:bg-white/[0.04] hover:-translate-y-0.5"
            >
              <h3 className="text-[13px] font-medium mb-1.5 flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 bg-aurora3 rounded-full flex-shrink-0 inline-block"
                  style={{ animation: 'pulse2 1.6s infinite' }}
                  aria-hidden="true"
                />
                {item.heading}
              </h3>
              <p className="text-muted text-[13px] leading-[1.55] transition-colors duration-300">{item.body}</p>
            </li>
          ))}
        </ul>
      </GlassCard>
    </section>
  )
}
