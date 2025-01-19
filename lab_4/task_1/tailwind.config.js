/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      screens: {
        // 'tablet': '1300'
      }
    },
  },
  plugins: [
    require('daisyui'),

  ],
  daisyui: {
    themes: ["pastel", "dark"]
  }
}