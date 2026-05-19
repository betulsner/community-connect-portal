/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lagoon: {
          50: "#f3f2f1",
          100: "#e7f1f8",
          300: "#5694ca",
          500: "#1d70b8",
          700: "#1d70b8"
        },
        sun: {
          100: "#f3f2f1",
          400: "#00703c",
          500: "#00703c",
          600: "#005a30"
        },
        ink: "#0b0c0c"
      },
      boxShadow: {
        portal: "none",
        lift: "none"
      },
      fontFamily: {
        sans: ["Helvetica", "Arial", "Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
