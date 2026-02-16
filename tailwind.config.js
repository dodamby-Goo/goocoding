/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        steel: {
          50: "#f3f4f6",
          100: "#e5e7eb",
          300: "#9ca3af",
          500: "#6b7280",
          700: "#374151",
          900: "#111827"
        }
      },
      letterSpacing: {
        lux: "0.28em"
      }
    }
  },
  plugins: []
};
