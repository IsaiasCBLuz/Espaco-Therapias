/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        castanho_rosado: "#BD7350",
        azul: "#C4DCD8",
        creme: "#FFF3E9",
        tostado_claro: "#D3C1B7"
      },
      fontFamily: {
        amsterdam: ['Amsterdam One', 'sans-serif'],
        dancing: ['Dancing Script', 'cursive'],
        spectral: ['Spectral', 'serif'],
      },
    },
  },
  plugins: [],
}
