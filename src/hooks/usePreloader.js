/**
 * usePreloader.js
 * ─────────────────────────────────────────────────────────────
 * Menjalankan animasi intro preloader saat pertama kali website dibuka.
 *
 * ALUR:
 *   1. Cek apakah navigasi dari dalam app (skipPreloader flag di history.state).
 *      Jika ya → sembunyikan preloader, langsung set body.intro-done, return.
 *   2. Scramble animation: nama "Frank Emmanuel Wuaten" ditampilkan dengan
 *      karakter acak dari CHARSET, lalu dikunci satu per satu seiring progress.
 *   3. Progress bar (#preBar) dan persentase (#prePct) naik acak setiap 150ms.
 *   4. Saat p = 100%:
 *      - Semua karakter dikunci (lockAll)
 *      - Tunggu 1920ms (delay sebelum transisi)
 *      - Preloader fade out (.done)
 *      - Tunggu 350ms → curtain atas & bawah buka (.open)
 *      - Tunggu 1150ms → body.intro-done (mulai animasi hero)
 *
 * SKIP PRELOADER:
 *   Jika window.history.state?.usr?.skipPreloader === true
 *   (di-set via React Router <Link state={{ skipPreloader: true }}>),
 *   preloader dilewati sepenuhnya dan body.intro-done langsung aktif.
 *   Ini mencegah preloader tampil ulang saat navigasi internal (Projects → Home).
 *
 * DOM DEPENDENCIES (dirender oleh Preloader.jsx):
 *   #preBar       — progress bar element
 *   #prePct       — teks persentase
 *   .pre-name     — container teks nama yang di-scramble
 *   #preloader    — wrapper preloader utama
 *   #curtainTop   — panel tirai atas
 *   #curtainBottom — panel tirai bawah
 */

import { useEffect } from 'react'

export function usePreloader() {
  useEffect(() => {
    // ── DOM Elements ───────────────────────────────────────
    const bar           = document.getElementById('preBar')
    const pct           = document.getElementById('prePct')
    const nameEl        = document.querySelector('.pre-name')
    const preloader     = document.getElementById('preloader')
    const curtainTop    = document.getElementById('curtainTop')
    const curtainBottom = document.getElementById('curtainBottom')
    if (!bar || !nameEl || !preloader) return

    // ── Skip Check ────────────────────────────────────────
    // React Router menyimpan state di window.history.state.usr
    // Link dengan state={{ skipPreloader: true }} akan meng-set flag ini
    if (window.history.state?.usr?.skipPreloader) {
      preloader.style.display   = 'none'
      curtainTop    && (curtainTop.style.display    = 'none')
      curtainBottom && (curtainBottom.style.display = 'none')
      document.body.classList.add('intro-done')
      return
    }

    // ── Scramble Config ────────────────────────────────────
    const TARGET_NAME  = 'Frank Emmanuel Wuaten'
    const CHARSET      = '01ABCDEFabcdef01102210' // karakter acak yang digunakan
    const CYCLE_LENGTH = 18                         // jumlah frame per karakter sebelum terkunci

    const chars  = TARGET_NAME.split('')
    const n      = chars.length
    const phase  = new Array(n).fill(0)              // progress animasi per karakter (0 → CYCLE_LENGTH)
    const speed  = chars.map(() => 0.3 + Math.random() * 0.4) // kecepatan tiap karakter (acak)
    const locked = new Array(n).fill(false)           // apakah karakter sudah terkunci ke nilai asli

    /**
     * Render semua karakter sebagai HTML.
     * Spasi → span lebar tetap. Terkunci → span.pre-char.locked.
     * Belum terkunci → karakter acak dengan opacity dan translateY berdasarkan phase.
     * @returns {string} HTML string
     */
    function render() {
      return chars.map((char, i) => {
        if (char === ' ') return '<span style="display:inline-block;width:.3em"> </span>'
        if (locked[i])   return `<span class="pre-char locked">${char}</span>`
        const idx = Math.floor(phase[i] * CHARSET.length / CYCLE_LENGTH) % CHARSET.length
        const c   = CHARSET[idx]
        const op  = (0.35 + (phase[i] / CYCLE_LENGTH) * 0.55).toFixed(2) // opacity 0.35 → 0.9
        const amp = Math.max(0, 1 - phase[i] / CYCLE_LENGTH)
        const dy  = (Math.sin(phase[i] * 1.8) * 6 * amp).toFixed(2)      // bounce translateY
        return `<span class="pre-char" style="opacity:${op};transform:translateY(${dy}px)">${c}</span>`
      }).join('')
    }

    /**
     * Majukan phase setiap karakter berdasarkan progress bar (p).
     * globalSpeed naik seiring progress sehingga karakter makin cepat terkunci
     * ketika loading hampir selesai.
     * @param {number} progress — nilai 0–100
     */
    function advance(progress) {
      const globalSpeed = 0.4 + (progress / 100) * 1.4
      for (let i = 0; i < n; i++) {
        if (locked[i] || chars[i] === ' ') continue
        phase[i] = Math.min(CYCLE_LENGTH, phase[i] + speed[i] * globalSpeed)
        if (phase[i] >= CYCLE_LENGTH) locked[i] = true
      }
    }

    /** Kunci semua karakter sekaligus (dipanggil saat p = 100%). */
    function lockAll() {
      for (let i = 0; i < n; i++) { phase[i] = CYCLE_LENGTH; locked[i] = true }
    }

    // ── Scramble Loop ──────────────────────────────────────
    let p = 0, scrambleFrame = null, lastTime = 0
    const state = { done: false }         // object ref agar closure selalu baca nilai terbaru
    const FPS = 30, INTERVAL_MS = 1000 / FPS

    /**
     * Loop animasi scramble pada 30 FPS menggunakan rAF.
     * Berhenti saat state.done = true.
     * @param {DOMHighResTimeStamp} timestamp
     */
    function scrambleLoop(timestamp) {
      if (state.done) return
      if (timestamp - lastTime >= INTERVAL_MS) {
        lastTime = timestamp
        advance(p)
        nameEl.innerHTML = render()
      }
      scrambleFrame = requestAnimationFrame(scrambleLoop)
    }

    // Mulai scramble setelah 200ms (beri waktu elemen muncul dengan fadeIn)
    setTimeout(() => { if (!state.done) scrambleFrame = requestAnimationFrame(scrambleLoop) }, 200)

    // ── Progress Bar ───────────────────────────────────────
    const iv = setInterval(() => {
      p += Math.random() * 11 + 2 // increment acak 2–13 per 150ms

      if (p >= 100) {
        // ── Selesai ──
        p = 100
        clearInterval(iv)
        state.done = true
        cancelAnimationFrame(scrambleFrame)
        lockAll()
        // Tampilkan nama lengkap + titik aurora
        nameEl.innerHTML = render() + '<span style="color:var(--aurora-2)">.</span>'
        bar.style.width  = '100%'
        pct.textContent  = '100%'
        bar.classList.add('glow')

        // Delay 1920ms sebelum mulai transisi keluar
        setTimeout(() => {
          preloader.classList.add('done') // fade out preloader
          setTimeout(() => {
            curtainTop?.classList.add('open')    // tirai atas naik
            curtainBottom?.classList.add('open') // tirai bawah turun
            setTimeout(() => {
              document.body.classList.add('intro-done') // aktifkan animasi hero
            }, 1150)
          }, 350)
        }, 1920)
        return
      }

      // ── Update bar & pct ──
      bar.style.width  = p + '%'
      pct.textContent  = Math.floor(p) + '%'
      if (p > 65) bar.classList.add('glow') // efek glow saat mendekati selesai
    }, 150)

    // Cleanup: hentikan semua timer saat komponen unmount
    return () => { state.done = true; clearInterval(iv); cancelAnimationFrame(scrambleFrame) }
  }, [])
}
