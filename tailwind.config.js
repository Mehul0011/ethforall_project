/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        primary: "#00b89f",
        background: "#24292d",
        backgroundPaper: "#272e36",

        // text colors
        primaryText: '#fff',
        contrastText: "#1a1a1a", 
        secondaryText: "#6C7175",

        //border
        borderColor: "#9c9c9c"
      }
    }
  },
  plugins: [],
}