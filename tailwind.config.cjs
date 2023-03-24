// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        prime: colors.emerald,
        neutral: colors.slate,
      },
      fontFamily: {
        sans: ["Noto Color Emoji", ...defaultTheme.fontFamily.sans],
        serif: ["Noto Color Emoji", ...defaultTheme.fontFamily.serif],
        mono: ["Noto Color Emoji", ...defaultTheme.fontFamily.mono]
      },
    },
  },
  plugins: [],
};
