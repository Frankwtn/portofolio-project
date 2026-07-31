/**
 * useSmoothScroll.js
 * ─────────────────────────────────────────────────────────────
 * Mengganti scroll native dengan smooth scroll berbasis lerp (linear interpolation).
 *
 * CARA KERJA:
 *   - Intercept event wheel (passive: false) → akumulasi `target` dari e.deltaY * 1.15
 *   - rAF loop: interpolasi `current` menuju `target` dengan faktor 0.07
 *   - window.scrollTo(0, current) setiap frame
 *   - Saat target - current < 0.4px, snap tepat ke target (stop loop)
 *
 * FAKTOR:
 *   deltaY multiplier 1.15  — sedikit mempercepat scroll dari wheel
 *   lerp factor 0.07        — makin kecil = makin lambat/smooth
 *
 * ANCHOR LINKS:
 *   Intercept klik pada a[href^="#"] — hitung target dari el.offsetTop - 90
 *   (90px = tinggi navbar + breathing room) dan scroll smooth ke sana.
 *
 * CONFLICT PREVENTION:
 *   Flag `userScrolling` mencegah handler scroll native me-reset `current`
 *   saat loop sedang berjalan (menghindari "jump" saat scroll programatik).
 */
import { useEffect } from 'react'

export function useSmoothScroll() {
  useEffect(() => {
    let current = window.scrollY  // posisi scroll saat ini
    let target  = window.scrollY  // posisi scroll yang dituju
    let userScrolling = false     // flag saat loop sedang write scrollTo
    let rafId

    /** Batas maksimum scroll (tinggi dokumen - tinggi viewport). */
    function maxScroll() {
      return document.body.scrollHeight - window.innerHeight
    }

    /**
     * Handler wheel: tambah deltaY ke target, clamp ke batas dokumen.
     * passive: false agar bisa preventDefault (mencegah scroll native paralel).
     */
    const onWheel = e => {
      e.preventDefault()
      target += e.deltaY * 1.15
      target = Math.max(0, Math.min(target, maxScroll()))
    }
    window.addEventListener('wheel', onWheel, { passive: false })

    /**
     * Handler scroll native: sync `target` dan `current` jika ada scroll
     * dari sumber lain (keyboard, touch, dll) selain loop ini sendiri.
     */
    const onScroll = () => {
      if (Math.abs(window.scrollY - current) > 2 && !userScrolling) {
        target  = window.scrollY
        current = window.scrollY
      }
    }
    window.addEventListener('scroll', onScroll)

    /**
     * rAF loop: interpolasi current → target lalu scrollTo.
     * Snap tepat ke target jika sudah sangat dekat.
     */
    function loop() {
      current += (target - current) * 0.07
      if (Math.abs(target - current) < 0.4) current = target
      userScrolling = true
      window.scrollTo(0, current)
      userScrolling = false
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    /**
     * Handler klik anchor link (a[href^="#"]).
     * Menghitung target scroll ke offsetTop elemen dikurangi tinggi navbar.
     */
    const handleAnchor = e => {
      const link = e.target.closest('a[href^="#"]')
      if (!link) return
      const el = document.querySelector(link.getAttribute('href'))
      if (!el) return
      e.preventDefault()
      target = Math.max(0, Math.min(el.offsetTop - 90, maxScroll()))
    }
    document.addEventListener('click', handleAnchor)

    // Cleanup semua event listener dan loop saat komponen unmount
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('click', handleAnchor)
    }
  }, [])
}
