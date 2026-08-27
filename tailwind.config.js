/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './app/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: 'rgb(var(--color-navy-rgb) / <alpha-value>)',
          light: 'rgb(var(--color-navy-light-rgb) / <alpha-value>)',
        },
        gold: {
          DEFAULT: 'rgb(var(--color-gold-rgb) / <alpha-value>)',
          light: 'rgb(var(--color-gold-light-rgb) / <alpha-value>)',
        },
        surface: { DEFAULT: 'rgb(var(--color-surface-rgb) / <alpha-value>)' },
        card: { DEFAULT: 'rgb(var(--color-card-rgb) / <alpha-value>)' },
        mist: { DEFAULT: 'rgb(var(--color-mist-rgb) / <alpha-value>)' },
        ink: {
          DEFAULT: 'rgb(var(--color-ink-rgb) / <alpha-value>)',
          secondary: 'rgb(var(--color-text-secondary-rgb) / <alpha-value>)',
        },
        coral: { DEFAULT: 'rgb(var(--color-coral-rgb) / <alpha-value>)' },
        sale: { DEFAULT: 'rgb(var(--color-sale-rgb) / <alpha-value>)' },
        green: { DEFAULT: 'rgb(var(--color-green-rgb) / <alpha-value>)' },
      },
      borderRadius: {
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        pill: 'var(--radius-pill)',
      },
      boxShadow: {
        subtle: 'var(--shadow-subtle)',
        card: 'var(--shadow-card)',
        hover: 'var(--shadow-hover)',
        glass: 'var(--shadow-glass)',
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        zain: ['Zain', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'fluid-display': 'clamp(2rem, 4vw + 1rem, 3.75rem)',
        'fluid-h1': 'clamp(1.75rem, 3vw + 0.75rem, 2.75rem)',
        'fluid-h2': 'clamp(1.375rem, 2vw + 0.5rem, 2rem)',
        'fluid-h3': 'clamp(1.125rem, 1.5vw + 0.25rem, 1.5rem)',
        'fluid-body': 'clamp(0.9375rem, 0.5vw + 0.75rem, 1.0625rem)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
