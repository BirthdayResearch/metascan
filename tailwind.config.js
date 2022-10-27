module.exports = {
  darkMode: "class",
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['"Space Grotesk"', "sans-serif"],
    },
    colors: {
      transparent: "rgba(0, 0, 0 ,0)",
      black: {
        50: "#737373",
        100: "#666666",
        200: "#595959",
        300: "#4D4D4D",
        400: "#404040",
        500: "#333333",
        600: "#262626",
        700: "#1A1A1A",
        800: "#0D0D0D",
        900: "#000000",
      },
      white: {
        50: "#FFFFFF",
        100: "#F2F2F2",
        200: "#E6E6E6",
        300: "#D9D9D9",
        400: "#CCCCCC",
        500: "#BFBFBF",
        600: "#B3B3B3",
        700: "#A6A6A6",
        800: "#999999",
        900: "#8C8C8C",
      },
      primary: {
        50: "#E1FFBC",
        100: "#D8FFA7",
        200: "#C6FF7E",
        300: "#B4FF56",
        400: "#A2FF2D",
        500: "#90FF04",
        600: "#71CB00",
        700: "#529300",
        800: "#335B00",
        900: "#132300",
      },
      secondary: {
        50: "#DECFFF",
        100: "#C8AFFF",
        200: "#AD87FF",
        300: "#9260FF",
        400: "#7638FF",
        500: "#5B10FF",
        600: "#4C0DD5",
        700: "#3D0BAA",
        800: "#2E0880",
        900: "#1E0555",
      },
      gray: {
        50: "#FAFAFA",
        100: "#F5F5F5",
        200: "#E5E5E5",
        300: "#D4D4D4",
        400: "#A3A3A3",
        500: "#737373",
        600: "#525252",
        700: "#404040",
        800: "#262626",
        900: "#171717",
      },
      red: {
        50: "#FFF2F2",
        100: "#FFE6E6",
        200: "#FFBFBF",
        300: "#FF9999",
        500: "#ED1414",
        600: "#E54545",
        700: "#A30000",
      },
      orange: {
        50: "#FFFAF4",
        100: "#FFF5EA",
        200: "#FFD2A3",
        300: "#FFD5A9",
        500: "#FF9629",
        600: "#E68725",
        700: "#BF711F",
      },
      green: {
        50: "#F2FBF4",
        100: "#E6F7E8",
        200: "#6FFD83",
        300: "#9AE1A4",
        500: "#02B31B",
        600: "#12BB41",
        700: "#028614",
      },
      blue: {
        50: "#F7FBFE",
        100: "#EFF6FD",
        200: "#D6EAF9",
        300: "#BDDDF5",
        500: "#5AA9E6",
        600: "#5198CF",
        700: "#3A6C92",
      },
    },
    extend: {
      borderRadius: {
        "2.5xl": "1.25rem",
      },
      screens: {
        '2.5xl': '1440px'
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        'fade-out': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 }
        },
        'fade-in-out': {
          '0%, 100%': { opacity: 0 },
          '35%, 65%': { opacity: 1 }
        },
        'fade-out-in': {
          '0%, 100%': { opacity: 1 },
          '35%, 65%': { opacity: 0 }
        }
      },
      animation: {
        'fade-in': 'fade-in 150ms ease-in-out',
        'fade-out': 'fade-out 150ms ease-in-out',
        'infinite-fade-in': 'fade-in-out 10s ease-in-out infinite',
        'infinite-fade-out': 'fade-out-in 10s ease-in-out infinite'
      }
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
