/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light Theme Colors
        light: {
          bg: '#FFFFFF',
          surface: '#F8F9FA',
          card: '#FFFFFF',
          border: '#E5E7EB',
          text: {
            primary: '#111827',
            secondary: '#6B7280',
            muted: '#9CA3AF',
          },
          primary: {
            DEFAULT: '#171717',
            hover: '#262626',
            light: '#F5F5F5',
          },
          accent: {
            DEFAULT: '#10B981',
            hover: '#059669',
          },
          // Dezente Akzente
          magenta: {
            DEFAULT: '#EC4899',
            hover: '#DB2777',
            light: '#FCE7F3',
          },
          cyan: {
            DEFAULT: '#06B6D4',
            hover: '#0891B2',
            light: '#CFFAFE',
          },
        },
        // Dark Theme Colors - Business Schwarz/Grau
        dark: {
          bg: '#0A0A0A',
          surface: '#1A1A1A',
          card: '#252525',
          border: '#3A3A3A',
          text: {
            primary: '#F5F5F5',
            secondary: '#D4D4D4',
            muted: '#A3A3A3',
          },
          primary: {
            DEFAULT: '#171717',
            hover: '#262626',
            light: '#404040',
          },
          accent: {
            DEFAULT: '#10B981',
            hover: '#059669',
          },
          // Dezente Akzente
          magenta: {
            DEFAULT: '#EC4899',
            hover: '#DB2777',
            light: '#FCE7F3',
          },
          cyan: {
            DEFAULT: '#06B6D4',
            hover: '#0891B2',
            light: '#CFFAFE',
          },
        },
      },
    },
  },
  plugins: [],
}