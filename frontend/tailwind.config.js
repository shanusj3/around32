/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blueMain: "#2F80ED",
        blackMain: "#181818",
        blackSec: "#333333",
        blackThi: "#4F4F4F",
      },
      fontFamily: {
        primary: ["SF Pro Display"],
      },
    },
  },
  plugins: [],
};
