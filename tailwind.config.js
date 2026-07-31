/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg:         '#0a0c10',
        'bg-2':     '#12151c',
        aurora1:    '#6c5ce7',
        aurora2:    '#00d9c0',
        aurora3:    '#ff6b9d',
        text:       '#f5f3ee',
        muted:      '#9497a6',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        sans:    ['Inter', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        glass: '18px',
      },
      backdropBlur: {
        glass: '16px',
      },
      animation: {
        pulse2:   'pulse2 2s infinite',
        pulse3:   'pulse3 1.6s infinite',
        shimmer:  'shimmer 2.5s infinite',
        scrollLine: 'scrollLine 2s infinite',
        fadeUp:   'fadeUp 1s ease forwards',
        lineUp:   'lineUp 1.3s cubic-bezier(.16,1,.3,1) forwards',
        certPulse: 'certPulse 2.4s ease-in-out infinite',
        preIn:    'preIn .8s ease forwards',
        navIn:    'navIn .9s ease forwards',
      },
      keyframes: {
        pulse2:     { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.4 } },
        pulse3:     { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.4 } },
        shimmer:    { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(200%)' } },
        scrollLine: { to: { top: '100%' } },
        fadeUp:     { from: { opacity: 0, transform: 'translateY(24px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        lineUp:     { to: { transform: 'translateY(0)' } },
        certPulse:  { '0%,100%': { boxShadow: '0 0 0 0 rgba(255,107,157,0)' }, '50%': { boxShadow: '0 0 0 4px rgba(255,107,157,0.15)' } },
        preIn:      { to: { opacity: 1 } },
        navIn:      { to: { opacity: 1 } },
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(.16,1,.3,1)',
        snap:   'cubic-bezier(.76,0,.24,1)',
      },
    },
  },
  plugins: [],
}
