/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sky-blue': '#6894CE',
        'mint-green': '#95C8BD',
        'gray-dark': '#656868',
      },
    },
  },
  plugins: [],
}
