/**
 * AuroraBackground.jsx
 * ─────────────────────────────────────────────────────────────
 * Komponen latar belakang aurora — canvas + noise overlay.
 *
 * CARA KERJA:
 *   - Render <canvas id="bg-canvas"> full-screen fixed di z-0
 *   - Pass canvasRef ke useAurora() yang menjalankan animasi blob
 *   - Render .noise-overlay (SVG noise pattern) di atas canvas untuk tekstur
 *
 * POSITIONING:
 *   Canvas: fixed, inset-0, z-0, pointer-events-none
 *   Noise:  fixed, inset-0, z-1, pointer-events-none, opacity 0.035
 *   Semua konten utama ada di z-[2] ke atas.
 *
 * Dipakai di: HomePage, ProjectsPage, CertificationsPage, NotFoundPage
 */

import { useRef } from 'react'
import { useAurora } from '../../hooks/useAurora'

export default function AuroraBackground() {
  const canvasRef = useRef(null)
  useAurora(canvasRef)

  return (
    <>
      <canvas
        ref={canvasRef}
        id="bg-canvas"
        className="fixed inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      />
      {/* Noise texture overlay untuk menambah depth visual */}
      <div className="noise-overlay" aria-hidden="true" />
    </>
  )
}
