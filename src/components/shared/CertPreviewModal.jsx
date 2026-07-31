/**
 * CertPreviewModal.jsx
 * ─────────────────────────────────────────────────────────────
 * Modal preview foto sertifikat / pelatihan.
 *
 * CARA BUKA/TUTUP:
 *   - Buka: prop `cert` di-set ke objek Certification (truthy)
 *   - Tutup: klik backdrop, klik tombol ✕, atau tekan Escape
 *
 * LAYOUT:
 *   - Jika cert.imageUrl tersedia  → tampilkan foto sertifikat
 *   - Jika cert.imageUrl null       → tampilkan placeholder dengan pesan
 *
 * SIDE EFFECTS:
 *   - Lock body scroll saat modal terbuka
 *   - Event listener Escape untuk menutup
 *
 * ACCESSIBILITY:
 *   role="dialog", aria-modal="true", aria-hidden saat tertutup.
 *
 * PROPS:
 * @param {Certification|null} cert    — sertifikat yang dipreview (null = modal tertutup)
 * @param {Function}           onClose — callback menutup modal
 */

import { useEffect } from 'react'

export default function CertPreviewModal({ cert, onClose }) {
  const isOpen = !!cert

  // Lock scroll
  useEffect(() => {
    if (cert) {
      document.body.style.overflow = 'hidden'
    }
    return () => { document.body.style.overflow = '' }
  }, [cert])

  // Escape key
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className={`proj-modal-backdrop ${isOpen ? 'open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={cert ? `Preview sertifikat: ${cert.name}` : 'Preview sertifikat'}
      aria-hidden={!isOpen}
      style={{ alignItems: 'center', paddingTop: '80px', paddingBottom: '20px' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="glass relative flex flex-col"
        style={{
          width: 'min(680px, 92vw)',
          maxHeight: 'calc(100vh - 100px)',
          borderRadius: '18px',
          border: '1px solid rgba(255,255,255,0.08)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-b border-white/8 flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/10 flex-shrink-0"
              style={{ background: cert?.logoUrl ? 'rgba(255,255,255,0.06)' : cert?.logoGrad }}
              aria-hidden="true"
            >
              {cert?.logoUrl ? (
                <img src={cert.logoUrl} alt={cert.issuer} className="w-6 h-6 object-contain rounded-md" />
              ) : (
                <span className="font-display text-[16px] font-bold">{cert?.letter}</span>
              )}
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[10px] text-aurora2 tracking-[0.08em] truncate">{cert?.issuer}</p>
              <p className="font-display text-[13px] font-semibold leading-tight truncate">{cert?.name}</p>
            </div>
          </div>
          <button
            className="w-8 h-8 flex-shrink-0 rounded-full bg-white/8 border border-white/10 text-muted text-[13px] flex items-center justify-center cursor-pointer hover:bg-white/12 hover:text-text hover:rotate-90 transition-all duration-300"
            onClick={onClose}
            aria-label="Tutup preview"
          >
            ✕
          </button>
        </div>

        {/* Image area — no scroll, gambar scale fit dalam ruang yang tersedia */}
        <div className="flex-1 p-5 flex items-center justify-center min-h-0">
          {cert?.imageUrl ? (
            <img
              src={cert.imageUrl}
              alt={`Sertifikat ${cert.name} dari ${cert.issuer}`}
              className="w-full h-full object-contain rounded-[10px] border border-white/8"
              style={{ maxHeight: 'calc(100vh - 260px)' }}
            />
          ) : (
            /* Placeholder saat foto belum tersedia */
            <div
              className="w-full flex flex-col items-center justify-center gap-4 rounded-[10px] border border-dashed border-white/15 py-16 px-8"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10"
                style={{ background: cert?.logoUrl ? 'rgba(255,255,255,0.06)' : cert?.logoGrad }}
                aria-hidden="true"
              >
                {cert?.logoUrl ? (
                  <img src={cert.logoUrl} alt={cert?.issuer} className="w-10 h-10 object-contain rounded-lg" />
                ) : (
                  <span className="font-display text-[28px] font-bold">{cert?.letter}</span>
                )}
              </div>
              <div className="text-center">
                <p className="font-display text-[15px] font-semibold mb-1">{cert?.name}</p>
                <p className="font-mono text-[11px] text-aurora2 mb-3">{cert?.issuer} · {cert?.year}</p>
                <p className="font-mono text-[11px] text-muted leading-relaxed max-w-[280px]">
                  Sertifikat belum tersedia.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-white/8 flex-shrink-0">
          <span
            className={`font-mono text-[9px] tracking-[0.1em] px-2.5 py-1 rounded-full border ${cert?.ongoing
              ? 'border-aurora3/40 text-aurora3 bg-aurora3/8'
              : 'border-aurora2/35 text-aurora2 bg-aurora2/8'
            }`}
            style={cert?.ongoing ? { animation: 'certPulse 2.4s ease-in-out infinite' } : {}}
          >
            {cert?.status}
          </span>
          <p className="font-mono text-[10px] text-muted">{cert?.year}</p>
        </div>
      </div>
    </div>
  )
}
