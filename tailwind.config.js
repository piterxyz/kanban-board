/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-[#9BF285]',
    'bg-[#8597F2]',
    'bg-[#8b5cf6]',
    'bg-[#EC706C]',
    'bg-[#eab308]',
    'shadow-[#9BF285]',
    'shadow-[#8597F2]',
    'shadow-[#8b5cf6]',
    'shadow-[#EC706C]',
    'shadow-[#eab308]',
    {
      pattern: /(bg|shadow)-(green|blue|violet|red|yellow)-(400|500)(\/80)?/
    }
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

