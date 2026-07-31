/**
 * useReveal.js
 * ─────────────────────────────────────────────────────────────
 * Scroll-driven reveal animation system menggunakan rAF loop.
 *
 * CARA KERJA:
 *   Setiap elemen dengan class `.reveal` atau `.stagger` dimasukkan
 *   ke dalam Map dengan state machine tiga kondisi:
 *     'below'   → di bawah viewport, hidden (from-bottom)
 *     'visible' → dalam viewport, animasi masuk (.in)
 *     'above'   → di atas viewport (sudah di-scroll lewati), hidden (from-top)
 *
 * CLASS ANIMASI (didefinisikan di index.css):
 *   .from-bottom → .in   : masuk dari bawah
 *   .from-top    → .in   : masuk dari atas (re-enter saat scroll naik)
 *   .to-top              : keluar ke atas
 *   .to-bottom           : keluar ke bawah
 *
 * THRESHOLD:
 *   ENTER_B = vh * 0.88  — elemen masuk viewport dari bawah
 *   ENTER_T = vh * 0.95  — elemen re-enter dari atas
 *   EXIT_B  = vh * 0.90  — elemen keluar ke bawah
 *   exitTop(el)          — elemen keluar ke atas (dinamis: NAV_H + 30% tinggi el)
 *
 * FITUR KHUSUS:
 *   - #skillsGrid → memanggil animateSkills() saat masuk, resetSkills() saat keluar
 *   - .now-card   → state machine terpisah untuk GlassCard wrapper
 *   - .hero       → toggle class .hero-exited saat hero lewat 55% viewport
 *   - footer      → tambah .footer-visible saat footer mulai terlihat
 *
 * DATA ATTRIBUTE:
 *   data-delay="300"  — menunda transition-delay dalam milidetik
 *
 * CATATAN:
 *   DOM di-query di dalam requestAnimationFrame pertama agar React
 *   selesai commit semua elemen sebelum hook mulai tracking.
 */

import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    // ── State ──────────────────────────────────────────────
    let revealEls      = []       // semua elemen .reveal / .stagger
    let heroSection    = null     // .hero untuk exit animation
    let footerEl       = null     // footer untuk fade-in
    let nowCard        = null     // .now-card — state machine terpisah
    let skillsAnimated = false    // flag agar animateSkills tidak dipanggil dua kali
    let rafId                     // ID requestAnimationFrame untuk cleanup
    const elState  = new Map()    // Map<Element, 'below' | 'visible' | 'above'>
    const nowState = { s: 'below' }

    /** Tinggi navbar (px) — dipakai sebagai batas atas viewport */
    const NAV_H = 60

    /**
     * Threshold exit atas per elemen.
     * Trigger saat seluruh elemen sudah melewati navbar (r.bottom < NAV_H).
     * @param {HTMLElement} el
     * @returns {number} pixel Y dari atas window
     */
    function exitTop(el) { return NAV_H }

    /**
     * Langsung set state visual tanpa transisi (untuk init dan reset).
     * Mematikan transition sementara dengan void el.offsetHeight (force reflow).
     * @param {HTMLElement} el
     * @param {string|null} cls  — class yang ditambahkan setelah reset ('from-bottom' | 'from-top' | null)
     */
    function setInstant(el, cls) {
      el.style.transition      = 'none'
      el.style.transitionDelay = ''
      el.classList.remove('in', 'from-bottom', 'from-top', 'to-top', 'to-bottom')
      if (cls) el.classList.add(cls)
      void el.offsetHeight // force reflow agar browser tidak batching transition
      el.style.transition = ''
    }

    /**
     * Animasikan elemen masuk viewport.
     * Menggunakan rAF satu frame agar CSS transition aktif setelah setInstant.
     * @param {HTMLElement} el
     * @param {'from-bottom'|'from-top'} fromCls — arah animasi masuk
     */
    function animateIn(el, fromCls) {
      const delay = parseInt(el.dataset.delay || '0', 10)
      setInstant(el, fromCls)
      requestAnimationFrame(() => {
        el.classList.remove('from-bottom', 'from-top')
        if (delay > 0) {
          el.style.transitionDelay = delay + 'ms'
          // Hapus delay setelah animasi selesai agar hover transition normal
          setTimeout(() => { el.style.transitionDelay = '' }, 1200 + delay)
        }
        el.classList.add('in')
        if (typeof window !== 'undefined' && typeof window.scrambleHeading === 'function') {
          const h = el.matches('h1, h2, hgroup, .sec-head, .now-card') ? el : el.querySelector('h1, h2, .display')
          if (h) setTimeout(() => { window.scrambleHeading(h) }, Math.max(100, delay + 80))
        }
      })
    }

    // ── Skill Bar Helpers ──────────────────────────────────

    /**
     * Animasikan semua skill bar ke lebar sesuai data-level.
     * Dipanggil saat #skillsGrid masuk viewport.
     * Menggunakan setTimeout 100ms agar CSS transition sudah aktif.
     */
    function animateSkills() {
      document.querySelectorAll('.skill-item').forEach(item => {
        const level = item.getAttribute('data-level')
        const fill  = item.querySelector('.skill-fill')
        const meter = item.querySelector('.skill-bar')
        if (meter) meter.value = parseInt(level, 10)
        setTimeout(() => { if (fill) fill.style.width = level + '%' }, 100)
      })
    }

    /** Reset semua skill bar ke 0 saat #skillsGrid keluar viewport. */
    function resetSkills() {
      document.querySelectorAll('.skill-fill').forEach(f => { f.style.width = '0%' })
      document.querySelectorAll('.skill-bar').forEach(m => { m.value = 0 })
    }

    // ── Core Loop ──────────────────────────────────────────

    /**
     * Cek posisi setiap elemen terhadap viewport dan transisi state machine.
     * Dipanggil setiap frame oleh revealLoop().
     *
     * Transisi state:
     *   below   + r.top < ENTER_B  → visible (animateIn dari bawah)
     *   visible + r.bottom < thr   → above   (to-top)
     *   above   + r.top > NAV_H    → visible (animateIn dari atas)
     *   visible + r.top > EXIT_B   → below   (to-bottom)
     */
    function checkReveal() {
      const vh      = window.innerHeight
      const ENTER_B = vh * 0.88  // masuk dari bawah
      const ENTER_T = vh * 0.95  // masuk dari atas
      const EXIT_B  = vh * 0.90  // keluar ke bawah

      revealEls.forEach(el => {
        const r     = el.getBoundingClientRect()
        const state = elState.get(el)
        const thr   = exitTop(el)

        if (state === 'below' && r.top < ENTER_B) {
          // ── Masuk dari bawah ──
          elState.set(el, 'visible')
          animateIn(el, 'from-bottom')
          if (el.id === 'skillsGrid' && !skillsAnimated) {
            skillsAnimated = true
            setTimeout(animateSkills, 300)
          }
        } else if (state === 'visible' && r.bottom < thr) {
          // ── Keluar ke atas ──
          elState.set(el, 'above')
          el.style.transitionDelay = ''
          el.classList.remove('in', 'from-bottom', 'from-top')
          el.classList.add('to-top')
          if (el.id === 'skillsGrid') { skillsAnimated = false; resetSkills() }
        } else if (state === 'above' && r.bottom > NAV_H + 20 && r.top < ENTER_T) {
          // ── Re-enter dari atas (scroll naik) ──
          elState.set(el, 'visible')
          animateIn(el, 'from-top')
          if (el.id === 'skillsGrid' && !skillsAnimated) {
            skillsAnimated = true
            setTimeout(animateSkills, 300)
          }
        } else if (state === 'visible' && r.top > EXIT_B) {
          // ── Keluar ke bawah (scroll naik menjauhi elemen) ──
          elState.set(el, 'below')
          el.style.transitionDelay = ''
          el.classList.remove('in', 'from-bottom', 'from-top')
          el.classList.add('to-bottom')
          if (el.id === 'skillsGrid') { skillsAnimated = false; resetSkills() }
        }
      })

      // ── .now-card: state machine terpisah ─────────────────
      // .now-card memiliki CSS animasi sendiri (.now-card.in, .now-card.to-top, dll)
      // sehingga tidak bisa masuk ke revealEls biasa
      if (nowCard) {
        const r   = nowCard.getBoundingClientRect()
        const st  = nowState.s
        const thr = exitTop(nowCard)

        if (st === 'below' && r.top < ENTER_B) {
          nowState.s = 'visible'
          nowCard.style.transition = 'none'
          nowCard.classList.remove('to-bottom', 'from-bottom', 'to-top')
          nowCard.classList.add('from-bottom')
          void nowCard.offsetHeight
          nowCard.style.transition = ''
          requestAnimationFrame(() => {
            nowCard.classList.remove('from-bottom')
            nowCard.classList.add('in')
            if (typeof window !== 'undefined' && typeof window.scrambleHeading === 'function') {
              window.scrambleHeading(nowCard)
            }
          })
        } else if (st === 'visible' && r.bottom < thr) {
          nowState.s = 'above'
          nowCard.classList.remove('in')
          nowCard.classList.add('to-top')
        } else if (st === 'above' && r.bottom > NAV_H + 20 && r.top < ENTER_T) {
          nowState.s = 'visible'
          nowCard.style.transition = 'none'
          nowCard.classList.remove('to-top', 'from-top')
          nowCard.classList.add('from-top')
          void nowCard.offsetHeight
          nowCard.style.transition = ''
          requestAnimationFrame(() => {
            nowCard.classList.remove('from-top')
            nowCard.classList.add('in')
            if (typeof window !== 'undefined' && typeof window.scrambleHeading === 'function') {
              window.scrambleHeading(nowCard)
            }
          })
        } else if (st === 'visible' && r.top > EXIT_B) {
          nowState.s = 'below'
          nowCard.classList.remove('in')
          nowCard.classList.add('to-bottom')
        }
      }

      // ── Hero exit ──────────────────────────────────────────
      // Tambah .hero-exited saat hero menghilang dari viewport (r.bottom < 55%)
      if (heroSection) {
        const r = heroSection.getBoundingClientRect()
        heroSection.classList.toggle('hero-exited', r.bottom < vh * 0.55)
      }

      // ── Footer fade-in ─────────────────────────────────────
      if (footerEl && footerEl.getBoundingClientRect().top < vh * 0.98) {
        footerEl.classList.add('footer-visible')
      }
    }

    /** rAF loop utama — memanggil checkReveal setiap frame. */
    function revealLoop() {
      checkReveal()
      rafId = requestAnimationFrame(revealLoop)
    }

    // ── Init ───────────────────────────────────────────────
    // Tunda satu rAF agar React selesai commit semua DOM sebelum query
    requestAnimationFrame(() => {
      revealEls   = Array.from(document.querySelectorAll('.reveal, .stagger'))
      heroSection = document.querySelector('.hero')
      footerEl    = document.querySelector('footer')
      nowCard     = document.querySelector('.now-card')

      // Set state awal berdasarkan posisi elemen saat halaman dimuat
      revealEls.forEach(el => {
        const r   = el.getBoundingClientRect()
        const thr = exitTop(el)
        if (r.top >= window.innerHeight * 0.88) {
          elState.set(el, 'below')
          setInstant(el, 'from-bottom')
        } else if (r.bottom <= thr) {
          elState.set(el, 'above')
          setInstant(el, 'from-top')
        } else {
          elState.set(el, 'visible')
          el.classList.add('in')
        }
      })

      // Init now-card
      if (nowCard) {
        const r = nowCard.getBoundingClientRect()
        if (r.top < window.innerHeight * 0.88) {
          nowState.s = 'visible'
          nowCard.classList.add('in')
        } else {
          nowCard.classList.add('from-bottom')
        }
      }

      rafId = requestAnimationFrame(revealLoop)
    })

    // Cleanup: hentikan loop saat komponen unmount
    return () => cancelAnimationFrame(rafId)
  }, [])
}
