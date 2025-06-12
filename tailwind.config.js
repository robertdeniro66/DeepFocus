/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./options/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ocean-surface': 'rgb(173, 216, 230)',
        'ocean-epipelagic': 'rgb(0, 119, 182)',
        'ocean-mesopelagic': 'rgb(0, 53, 102)',
        'ocean-bathypelagic': 'rgb(0, 24, 48)',
        'ocean-abyssal': 'rgb(0, 0, 0)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'swim': 'swim 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        swim: {
          '0%, 100%': { transform: 'translateX(0) translateY(0)' },
          '25%': { transform: 'translateX(10px) translateY(-5px)' },
          '50%': { transform: 'translateX(0) translateY(-10px)' },
          '75%': { transform: 'translateX(-10px) translateY(-5px)' },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}; 