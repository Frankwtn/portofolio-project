/**
 * useCursor.js
 * ─────────────────────────────────────────────────────────────
 * Custom cursor dengan dua elemen: dot (snap) dan ring (lerp).
 *
 * DOT (#cursorDot):
 *   Mengikuti kursor secara langsung setiap mousemove — tidak ada lag.
 *
 * RING (#cursorRing):
 *   Mengikuti kursor dengan lerp (faktor 0.18) via rAF loop,
 *   menciptakan efek "trailing" yang halus.
 *
 * HOVER STATE:
 *   Menggunakan document.elementFromPoint() untuk mengecek elemen
 *   yang benar-benar di bawah kursor (bukan yang tertindih navbar, dll).
 *   Class .hover ditambahkan ke ring saat cursor berada di atas:
 *     - [data-magnetic] — elemen dengan efek magnetik
 *     - a, button       — elemen interaktif standar
 *     - .glass          — glass-morphism card
 *
 * GLASS SPECULAR:
 *   CSS custom properties --mx dan --my di-set pada elemen .glass
 *   yang berada tepat di bawah kursor. Ini menggerakkan radial-gradient
 *   di .glass::before (definisi di index.css) untuk efek cahaya mengikuti kursor.
 *   Hanya satu elemen .glass aktif pada satu waktu (activeGlassEl).
 *
 * MAGNETIC EFFECT:
 *   Elemen [data-magnetic] bergerak sedikit mengikuti kursor
 *   (25% dari jarak kursor ke tengah elemen).
 *   Kembali ke posisi asal saat mouseleave.
 *
 * DOM DEPENDENCIES:
 *   #cursorDot  — span titik kursor (dirender oleh Cursor.jsx)
 *   #cursorRing — span ring kursor (dirender oleh Cursor.jsx)
 */

import { useEffect } from 'react'

export function useCursor() {
  useEffect(() => {
    const dot  = document.getElementById('cursorDot')
    const ring = document.getElementById('cursorRing')
    if (!dot || !ring) return

    // Posisi kursor aktual (dot)
    let mx = 0, my = 0
    // Posisi ring saat ini (lerp target)
    let rx = 0, ry = 0
    let animId
    // Elemen .glass yang sedang aktif menerima --mx/--my
    let activeGlassEl = null

    /**
     * Handler mousemove:
     * - Snap dot langsung ke posisi kursor
     * - Update --mx/--my pada .glass elemen di bawah kursor
     * - Toggle .hover pada ring sesuai elemen di bawah kursor
     */
    const onMove = e => {
      mx = e.clientX
      my = e.clientY

      // Posisikan dot langsung
      dot.style.left = mx + 'px'
      dot.style.top  = my + 'px'

      // Cari elemen paling atas di posisi kursor (lewati overlay transparan)
      const topEl  = document.elementFromPoint(mx, my)
      const glassEl = topEl ? topEl.closest('.glass') : null

      // Ganti activeGlassEl jika berubah
      if (glassEl !== activeGlassEl) {
        if (activeGlassEl) activeGlassEl.style.removeProperty('--mx')
        activeGlassEl = glassEl
      }

      // Update posisi cahaya specular pada glass element
      if (glassEl) {
        const r = glassEl.getBoundingClientRect()
        glassEl.style.setProperty('--mx', (mx - r.left) + 'px')
        glassEl.style.setProperty('--my', (my - r.top)  + 'px')
      }

      // Toggle .hover hanya jika elemen di bawah kursor adalah interaktif
      const isHoverable = topEl && topEl.closest('[data-magnetic], a, button, .glass')
      if (isHoverable) {
        ring.classList.add('hover')
      } else {
        ring.classList.remove('hover')
      }
    }

    window.addEventListener('mousemove', onMove)

    /**
     * rAF loop: interpolasi posisi ring menuju posisi dot.
     * Faktor lerp 0.18 menghasilkan trailing yang halus.
     */
    function animRing() {
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      ring.style.left = rx + 'px'
      ring.style.top  = ry + 'px'
      animId = requestAnimationFrame(animRing)
    }
    animRing()

    /**
     * Attach efek magnetik pada semua elemen [data-magnetic].
     * Elemen bergerak 25% dari jarak kursor ke pusatnya saat mousemove,
     * dan kembali ke posisi asal saat mouseleave.
     * @param {string} selector — CSS selector
     */
    function addMagnetic(selector) {
      document.querySelectorAll(selector).forEach(el => {
        el.addEventListener('mousemove', e => {
          const r = el.getBoundingClientRect()
          const x = e.clientX - r.left - r.width  / 2
          const y = e.clientY - r.top  - r.height / 2
          el.style.transform = `translate(${x * 0.25}px,${y * 0.25}px)`
        })
        el.addEventListener('mouseleave', () => {
          el.style.transform = 'translate(0,0)'
        })
      })
    }

    addMagnetic('[data-magnetic]')

    // Cleanup: hentikan loop dan lepas event listener
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])
}
