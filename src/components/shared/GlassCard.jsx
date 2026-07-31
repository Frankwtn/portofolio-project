/**
 * GlassCard.jsx
 * ─────────────────────────────────────────────────────────────
 * Wrapper polimorfik untuk glass-morphism card.
 *
 * FUNGSI:
 *   Menambahkan class `.glass` (didefinisikan di index.css) pada elemen apapun,
 *   dan melacak posisi mouse sebagai CSS custom properties --mx dan --my.
 *   Properti ini digunakan oleh `.glass::before` untuk efek specular (cahaya
 *   mengikuti kursor pada permukaan card).
 *
 * PROPS:
 * @param {string}    [className=''] — Class tambahan selain .glass
 * @param {ReactNode} children       — Konten di dalam card
 * @param {string}    [tag='div']    — Tag HTML yang dirender (div, li, article, dll)
 * @param {...any}    props          — Props tambahan diteruskan ke elemen
 *
 * CONTOH PENGGUNAAN:
 *   <GlassCard>konten</GlassCard>
 *   <GlassCard tag="li" data-level="80" className="skill-item">...</GlassCard>
 *   <GlassCard tag="article" className="cert-card">...</GlassCard>
 */

export default function GlassCard({ className = '', children, tag: Tag = 'div', ...props }) {
  /**
   * Update CSS custom properties --mx dan --my berdasarkan posisi mouse
   * relatif terhadap elemen ini. Dipakai oleh .glass::before radial gradient.
   * @param {MouseEvent} e
   */
  function onMouseMove(e) {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', (e.clientX - r.left) + 'px')
    e.currentTarget.style.setProperty('--my', (e.clientY - r.top)  + 'px')
  }

  return (
    <Tag className={`glass ${className}`} onMouseMove={onMouseMove} {...props}>
      {children}
    </Tag>
  )
}
