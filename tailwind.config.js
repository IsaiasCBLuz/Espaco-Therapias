/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        castanho_rosado: "#BD7350",
        // castanho_rosado: "#DDA28A",
        // castanho_rosado: "#EBC9B5",
        // azul: "#C4DCD8",
        // azul: "#E6F2F0",
        azul: "#F2FBFA",
        // creme: "#FFF3E9",
        creme: "#FFF8F2",
        // creme: "#FFFDF9",
        // tostado_claro: "#D3C1B7",
        // tostado_claro: "#E8D9CF",
        tostado_claro: "#F4E9E3"
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
