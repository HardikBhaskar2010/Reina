/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* pink-300 with opacity */
        input: "var(--color-input)", /* white */
        ring: "var(--color-ring)", /* soft-pink-200 */
        background: "var(--color-background)", /* pale-pink-50 */
        foreground: "var(--color-foreground)", /* deep-mauve-900 */
        primary: {
          DEFAULT: "var(--color-primary)", /* soft-pink-200 */
          foreground: "var(--color-primary-foreground)", /* deep-mauve-900 */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* classic-pink-300 */
          foreground: "var(--color-secondary-foreground)", /* deep-mauve-900 */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* gentle-coral-300 */
          foreground: "var(--color-destructive-foreground)", /* deep-mauve-900 */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* classic-pink-300 */
          foreground: "var(--color-muted-foreground)", /* muted-purple-600 */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* warm-gold-400 */
          foreground: "var(--color-accent-foreground)", /* deep-mauve-900 */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* white */
          foreground: "var(--color-popover-foreground)", /* deep-mauve-900 */
        },
        card: {
          DEFAULT: "var(--color-card)", /* white */
          foreground: "var(--color-card-foreground)", /* deep-mauve-900 */
        },
        success: {
          DEFAULT: "var(--color-success)", /* soft-mint-300 */
          foreground: "var(--color-success-foreground)", /* deep-mauve-900 */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* warm-peach-300 */
          foreground: "var(--color-warning-foreground)", /* deep-mauve-900 */
        },
        error: {
          DEFAULT: "var(--color-error)", /* gentle-coral-300 */
          foreground: "var(--color-error-foreground)", /* deep-mauve-900 */
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        'heading': ['Amatic SC', 'cursive'],
        'body': ['Poppins', 'sans-serif'],
        'caption': ['Quicksand', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'soft': 'var(--shadow-soft)',
        'gentle': 'var(--shadow-gentle)',
        'medium': 'var(--shadow-medium)',
        'strong': 'var(--shadow-strong)',
        'floating': 'var(--shadow-floating)',
      },
      backdropBlur: {
        'glass': '20px',
        'card': '16px',
      },
      animation: {
        'bounce-gentle': 'bounceGentle 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        'heart-pulse': 'heartPulse 1.5s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'float-medium': 'floatMedium 4s ease-in-out infinite',
        'float-fast': 'floatFast 3s ease-in-out infinite',
      },
      keyframes: {
        bounceGentle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
        heartPulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        floatMedium: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(-2deg)' },
        },
        floatFast: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(3deg)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}