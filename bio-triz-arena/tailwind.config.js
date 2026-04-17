/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        arena: {
          bg: '#050508',
          stage: '#0A0A15',
          panel: '#0D0D20',
          card: '#12122A',
        },
        neon: {
          blue: '#00D4FF',
          purple: '#9B59FF',
          pink: '#FF2D78',
          green: '#39FF14',
          yellow: '#FFE135',
          orange: '#FF6B35',
        },
        team: {
          alpha: '#00D4FF',
          beta: '#FF2D78',
          gamma: '#39FF14',
          delta: '#9B59FF',
        },
        award: {
          gold: '#FFB300',
          silver: '#B0BEC5',
          bronze: '#8D6E63',
        }
      },
      fontFamily: {
        arena: ['Orbitron', 'sans-serif'],
        score: ['Bebas Neue', 'sans-serif'],
        question: ['Exo 2', 'sans-serif'],
        answer: ['Rajdhani', 'sans-serif'],
        team: ['Barlow Condensed', 'sans-serif'],
        ui: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(0, 212, 255, 0.4)',
        'glow-green': '0 0 20px rgba(57, 255, 20, 0.4)',
        'glow-pink': '0 0 20px rgba(255, 45, 120, 0.4)',
      }
    },
  },
  plugins: [],
}
