/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'slide-right': 'slideRight 0.6s ease-in-out',
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'fade-in-left': 'fadeInLeft 0.6s ease-in-out forwards',
        'icon-rotate': 'iconRotate 0.5s ease-in-out forwards',
      },
      keyframes: {
        slideRight: {
          from: {
            opacity: '0',
            transform: 'translateX(100%)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        fadeIn: {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
        fadeInLeft: {
          from: {
            opacity: '0',
            transform: 'translateX(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        iconRotate: {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(90deg)',
          },
        },
      },
    },
  },
  plugins: [],
}
