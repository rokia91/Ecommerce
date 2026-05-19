/** @type {import('tailwindcss').Config} */
import plugin from 'flowbite/plugin'
import { flowbite } from 'flowbite-react/tailwind';
export default {
  darkMode:'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ]
  
  ,  theme: {
    extend: {},
  },
  plugins: [
    plugin
  ],
}

