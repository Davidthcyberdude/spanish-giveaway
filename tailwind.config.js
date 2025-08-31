/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#10B981', // Emerald green
        secondary: '#6366F1', // Indigo
        background: '#F8F9FA', // Light cream
        backgroundDark: '#1F2937', // Dark slate
        card: '#FFFFFF', // White
        cardDark: '#374151', // Dark gray
        text: '#111827', // Dark slate
        textDark: '#F9FAFB', // Light gray
        textSecondary: '#6B7280', // Medium gray
        textSecondaryDark: '#D1D5DB', // Light gray
        border: '#E5E7EB', // Light gray
        borderDark: '#4B5563', // Medium gray
        accent: '#FACC15', // Gold
        gold: {
          500: '#F59E0B',
        },
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
