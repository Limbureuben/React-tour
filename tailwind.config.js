export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@mui/material/**/*.{js,jsx,ts,tsx}" // Add this line
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Disable Tailwind's base styles to prevent conflicts
  }
}