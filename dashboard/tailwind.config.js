module.exports = {
  theme: {
    extend: {
      keyframes: {
        glitch: {
          '0%': { textShadow: '1px 1px 2px #00ff00' },
          '50%': { textShadow: '2px -2px 2px #003300' },
          '100%': { textShadow: '1px 1px 2px #00ff00' },
        },
      },
      animation: {
        glitch: 'glitch 1s infinite',
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow'),
  ],
};