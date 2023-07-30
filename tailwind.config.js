/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#0B0B0B",
        "primary-light": "#323232",
        accent: "#0986F7",
        grey: "#878787",
        "grey-light": "#F3F3F3",
      },
      boxShadow: {
        sd: "0 0 20px 0px rgba(0, 0, 0, 0.3)",
      },
      keyframes: {
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(180deg)" },
        },
      },
      animation: {
        rotate: "rotate 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
}
