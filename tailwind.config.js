/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    backgroundImage: {
      "button-gradient":
        "linear-gradient(-30deg, #B37FEB 0%, #D2AEF500 18%, #EFDBFF 83%)"
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#B03DF8",
          background: "#0F0824",
          border: "#793BC4"
        }
      },
      borderWidth: {
        3: "3px"
      },
      fontFamily: {
        SFPro: ["SF Pro Display"]
      }
    }
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })]
};
