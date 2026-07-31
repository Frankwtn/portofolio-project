/**
 * useAurora.js
 * ─────────────────────────────────────────────────────────────
 * Animasi latar belakang aurora menggunakan Canvas 2D API.
 *
 * CARA KERJA:
 *   Tiga blob radial gradient bergerak perlahan di layar menggunakan:
 *   - Velocity (vx, vy): pergerakan konstan per frame
 *   - Drift: Math.sin/cos berdasarkan waktu (t) untuk gerak organik
 *   - Follow factor (ff): blob sedikit mengikuti posisi kursor mouse
 *   - Wrapping: blob yang keluar sisi kanan muncul dari kiri, dst.
 *
 * WARNA BLOB:
 *   Blob 0 — aurora-1 (ungu): rgba(108,92,231,0.35)
 *   Blob 1 — aurora-2 (teal): rgba(0,217,192,0.28)
 *   Blob 2 — aurora-3 (pink): rgba(255,107,157,0.18)
 *
 * RENDERING:
 *   Setiap frame: clear canvas → fill background #0a0c10 → draw each blob
 *   sebagai radial gradient fillRect (full canvas size, transparan di tepi).
 *
 * @param {React.RefObject<HTMLCanvasElement>} canvasRef — ref ke elemen canvas
 */
import { useEffect } from 'react'

export function useAurora(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w, h, animId

    /** Resize canvas agar sesuai ukuran window. */
    function resize() {
      w = canvas.width  = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Posisi pointer untuk efek follow blob
    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const onMove  = e => { pointer.x = e.clientX; pointer.y = e.clientY }
    window.addEventListener('mousemove', onMove)

    /**
     * Konfigurasi tiga blob aurora.
     * vx/vy: kecepatan px/frame. ff: seberapa kuat blob mengikuti kursor.
     */
    const blobs = [
      { x: window.innerWidth * 0.2, y: window.innerHeight * 0.3, r: 380, color: 'rgba(108,92,231,0.35)', vx: 0.15,  vy: 0.10,  ff: 0.02  },
      { x: window.innerWidth * 0.8, y: window.innerHeight * 0.6, r: 420, color: 'rgba(0,217,192,0.28)',   vx: -0.10, vy: 0.12,  ff: 0.015 },
      { x: window.innerWidth * 0.5, y: window.innerHeight * 0.8, r: 320, color: 'rgba(255,107,157,0.18)', vx: 0.08,  vy: -0.10, ff: 0.01  },
    ]
    let t = 0 // waktu global untuk drift sinusoidal

    /**
     * Loop render utama.
     * Setiap frame: update posisi blob → clear → draw background → draw blobs.
     */
    function draw() {
      t += 0.01
      ctx.clearRect(0, 0, w, h)

      // Background gelap
      ctx.fillStyle = '#0a0c10'
      ctx.fillRect(0, 0, w, h)

      blobs.forEach((b, i) => {
        // Gerak konstan + drift sinusoidal organik
        b.x += b.vx + Math.sin(t + i) * 0.3
        b.y += b.vy + Math.cos(t + i) * 0.3

        // Tarik blob sedikit ke arah pointer
        b.x += (pointer.x - b.x) * b.ff * 0.02
        b.y += (pointer.y - b.y) * b.ff * 0.02

        // Wrap posisi agar blob tidak menghilang
        if (b.x < -b.r)    b.x = w + b.r
        if (b.x > w + b.r) b.x = -b.r
        if (b.y < -b.r)    b.y = h + b.r
        if (b.y > h + b.r) b.y = -b.r

        // Gambar blob sebagai radial gradient
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r)
        g.addColorStop(0, b.color)
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.fillRect(0, 0, w, h)
      })

      animId = requestAnimationFrame(draw)
    }
    draw()

    // Cleanup: hentikan loop dan lepas event listener
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [canvasRef])
}
