/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui"],
        serif: ["var(--font-newsreader)", "Georgia", "serif"],
      },
      colors: {
        lake: {
          950: "#03111e",
          900: "#061b2e",
          800: "#082f49",
          700: "#075985",
          500: "#0891b2",
          300: "#67e8f9",
        },
        reed: "#9cc56b",
        ember: "#f97316",
        warning: "#ef4444",
      },
      boxShadow: {
        glow: "0 0 40px rgba(103, 232, 249, 0.2)",
      },
    },
  },
  plugins: [],
};
