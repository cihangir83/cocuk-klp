/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep': '#070D1A',
        'card': '#0F1E2E',
        'surface': '#162438',
        'border-subtle': '#1E3A5F',
        'green-primary': '#00C896',
        'green-deep': '#007A5E',
        'gold': '#F5A623',
        'gold-shimmer': '#FFD700',
        'danger': '#E84545',
        'text-primary': '#E8F4F8',
        'text-secondary': '#7FA8C9',
        'text-muted': '#3D6080',
        'locked': '#0A1420',
        'fog': 'rgba(7,13,26,0.85)',
      },
      fontFamily: {
        'display': ['"Bebas Neue"', 'sans-serif'],
        'heading': ['Poppins', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s ease-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'fog-dissolve': 'fog-dissolve 1.5s ease-out forwards',
        'shake': 'shake 0.5s ease-in-out',
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'streak-fire': 'streak-fire 0.5s ease-in-out infinite',
        'card-enter': 'card-enter 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'slide-down': 'slide-down 0.5s ease-out forwards',
        'count-up': 'count-up 1s ease-out forwards',
        'progress-fill': 'progress-fill 1s ease-out forwards',
        'spin-slow': 'spin 4s linear infinite',
        'wave': 'wave 1s ease-out forwards',
        'particle': 'particle 10s linear infinite',
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'scale(2.5)', opacity: '0' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'fog-dissolve': {
          '0%': { opacity: '1', filter: 'blur(0px)' },
          '100%': { opacity: '0', filter: 'blur(10px)' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
        },
        'glow': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0,200,150,0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(0,200,150,0.6), 0 0 40px rgba(0,200,150,0.2)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'streak-fire': {
          '0%, 100%': { textShadow: '0 0 5px #F5A623' },
          '50%': { textShadow: '0 0 20px #F5A623, 0 0 40px #E84545, 0 0 60px #F5A623' },
        },
        'card-enter': {
          '0%': { transform: 'scale(0.3) translateY(100px)', opacity: '0' },
          '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'wave': {
          '0%': { transform: 'scale(0)', opacity: '0.6' },
          '100%': { transform: 'scale(3)', opacity: '0' },
        },
        'particle': {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-100vh) translateX(50px)', opacity: '0' },
        },
      },
      boxShadow: {
        'card': '0 4px 15px rgba(0,0,0,0.4), 0 1px 3px rgba(0,0,0,0.3)',
        'card-hover': '0 8px 30px rgba(0,200,150,0.15), 0 4px 10px rgba(0,0,0,0.4)',
        'card-rare': '0 0 20px rgba(245,166,35,0.3), 0 4px 15px rgba(0,0,0,0.4)',
        'card-ultra': '0 0 30px rgba(255,215,0,0.4), 0 0 60px rgba(255,215,0,0.1), 0 4px 15px rgba(0,0,0,0.4)',
        'glow-green': '0 0 20px rgba(0,200,150,0.4)',
        'glow-gold': '0 0 20px rgba(245,166,35,0.4)',
        'inner-deep': 'inset 0 2px 10px rgba(0,0,0,0.5)',
      },
      backgroundImage: {
        'holo-gradient': 'linear-gradient(135deg, rgba(0,200,150,0.1), rgba(245,166,35,0.1), rgba(155,89,182,0.1), rgba(0,200,150,0.1))',
        'shimmer-gradient': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
        'card-gradient': 'linear-gradient(180deg, #162438 0%, #0F1E2E 100%)',
      },
    },
  },
  plugins: [],
}
