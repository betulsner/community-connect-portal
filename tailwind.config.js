/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lagoon: {
          50: "#effdfb",
          100: "#d8f7f3",
          300: "#7fe2db",
          500: "#17b9b2",
          700: "#0f766e"
        },
        sun: {
          100: "#ffe8cc",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c"
        },
        ink: "#111827"
      },
      boxShadow: {
        portal: "0 24px 70px rgba(12, 74, 110, 0.24)",
        lift: "0 14px 40px rgba(15, 23, 42, 0.12)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "Arial", "sans-serif"]
      }
    }
  },
  plugins: []
};
