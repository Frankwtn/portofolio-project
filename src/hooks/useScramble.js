/**
 * useScramble.js
 * ─────────────────────────────────────────────────────────────
 * Efek scramble teks pada heading saat di-hover maupun saat reveal.
 */
import { useEffect } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export function triggerScramble(el) {
  if (!el) return
  const targetHeading = el.matches('h1, h2, .display') ? el : el.querySelector('h1, h2, .display')
  if (!targetHeading) return

  const lines = targetHeading.querySelectorAll('.line span')
  if (!lines.length) {
    const orig = targetHeading.dataset.original || targetHeading.textContent
    targetHeading.dataset.original = orig
    let f = 0
    const id = setInterval(() => {
      targetHeading.textContent = orig.split('').map((c, i) => {
        if (' .,&'.includes(c)) return c
        if (f / 18 > i / orig.length) return c
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      }).join('')
      if (f >= 18) {
        targetHeading.textContent = orig
        clearInterval(id)
      }
      f++
    }, 30)
    return
  }

  lines.forEach(span => {
    const orig = span.dataset.original || span.textContent
    span.dataset.original = orig
    let f = 0
    const id = setInterval(() => {
      span.textContent = orig.split('').map((c, i) => {
        if (' .,&'.includes(c)) return c
        if (f / 18 > i / orig.length) return c
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      }).join('')
      if (f >= 18) {
        span.textContent = orig
        clearInterval(id)
      }
      f++
    }, 30)
  })
}

if (typeof window !== 'undefined') {
  window.scrambleHeading = triggerScramble
}

export function useScramble(selector = 'hgroup h2, .now-card h2, .sec-head h2, h2.display, .ppage-title') {
  useEffect(() => {
    const els = document.querySelectorAll(selector)
    els.forEach(h => {
      h.style.cursor = 'default'
      h.addEventListener('mouseenter', () => triggerScramble(h))
    })
  }, [selector])
}
