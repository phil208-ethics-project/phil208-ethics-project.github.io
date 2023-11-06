/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'

const children = plugin(({ addVariant }) => {
  addVariant('child', '& > *')
})

export default {
  mode: 'jit',
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {},
  plugins: [children],
}
