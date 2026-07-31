/**
 * Cursor.jsx
 * ─────────────────────────────────────────────────────────────
 * Render elemen custom cursor dan attach behavior via useCursor().
 *
 * ELEMEN:
 *   #cursorDot  — titik kecil (6px) yang snap langsung ke posisi mouse
 *   #cursorRing — lingkaran (36px) yang follow dengan lerp (trailing effect)
 *
 * STATES RING (via CSS class, dikelola oleh useCursor):
 *   .hover      — ring membesar (64px) saat di atas elemen interaktif
 *   .with-label — ring lebih besar (72px) dengan label teks (contoh: 'OPEN', 'FLIP')
 *                 Label diset via ring.setAttribute('data-label', 'OPEN')
 *
 * RESPONSIVE:
 *   .cursor-dot dan .cursor-ring di-hide via CSS pada viewport <900px (mobile/tablet).
 *   body { cursor: auto } juga aktif di mobile.
 *
 * Dipakai di: HomePage, ProjectsPage, CertificationsPage, NotFoundPage
 */

import { useCursor } from '../../hooks/useCursor'

export default function Cursor() {
  useCursor()

  return (
    <>
      <span className="cursor-dot"  id="cursorDot"  aria-hidden="true" />
      <span className="cursor-ring" id="cursorRing" aria-hidden="true" />
    </>
  )
}
