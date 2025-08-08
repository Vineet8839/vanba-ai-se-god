/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', /* warm earth tone border */
        input: 'var(--color-input)', /* subtle elevation color */
        ring: 'var(--color-ring)', /* soft celestial blue */
        background: 'var(--color-background)', /* warm off-white */
        foreground: 'var(--color-foreground)', /* rich dark brown */
        primary: {
          DEFAULT: 'var(--color-primary)', /* warm earth tone */
          foreground: 'var(--color-primary-foreground)', /* warm off-white */
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* complementary sage */
          foreground: 'var(--color-secondary-foreground)', /* rich dark brown */
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* muted terracotta */
          foreground: 'var(--color-destructive-foreground)', /* warm off-white */
        },
        muted: {
          DEFAULT: 'var(--color-muted)', /* subtle elevation color */
          foreground: 'var(--color-muted-foreground)', /* muted brown */
        },
        accent: {
          DEFAULT: 'var(--color-accent)', /* soft celestial blue */
          foreground: 'var(--color-accent-foreground)', /* warm off-white */
        },
        popover: {
          DEFAULT: 'var(--color-popover)', /* warm off-white */
          foreground: 'var(--color-popover-foreground)', /* rich dark brown */
        },
        card: {
          DEFAULT: 'var(--color-card)', /* subtle elevation color */
          foreground: 'var(--color-card-foreground)', /* rich dark brown */
        },
        success: {
          DEFAULT: 'var(--color-success)', /* natural green */
          foreground: 'var(--color-success-foreground)', /* warm off-white */
        },
        warning: {
          DEFAULT: 'var(--color-warning)', /* gentle amber */
          foreground: 'var(--color-warning-foreground)', /* rich dark brown */
        },
        error: {
          DEFAULT: 'var(--color-error)', /* muted terracotta */
          foreground: 'var(--color-error-foreground)', /* warm off-white */
        },
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['Source Sans 3', 'sans-serif'],
        caption: ['Nunito Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        'sacred': '1.618rem', /* Golden ratio */
      },
      borderRadius: {
        'lg': '12px',
        'md': '8px',
        'sm': '4px',
        'sacred': '8px',
      },
      boxShadow: {
        'contemplative': '0 2px 4px rgba(139, 115, 85, 0.1), 0 8px 16px rgba(139, 115, 85, 0.1)',
        'contemplative-lg': '0 4px 8px rgba(139, 115, 85, 0.1), 0 12px 24px rgba(139, 115, 85, 0.1), 0 24px 48px rgba(139, 115, 85, 0.05)',
        'voice-indicator': '0 0 20px rgba(107, 140, 174, 0.3)',
      },
      animation: {
        'breathe': 'breathe 2s ease-in-out infinite',
        'voice-pulse': 'voice-pulse 1.5s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(0.98)' },
          '50%': { transform: 'scale(1.0)' },
        },
        'voice-pulse': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
        'fade-in-up': {
          'from': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      backdropBlur: {
        'sacred': '20px',
      },
      transitionTimingFunction: {
        'contemplative': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        'breathing': 'ease-in-out',
      },
      transitionDuration: {
        '150': '150ms',
        '300': '300ms',
        '500': '500ms',
        '2000': '2000ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}