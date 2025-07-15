/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        light: {
          primary: "#CAEB66",    // Light Green
          secondary: "#F4A261",  // Orange
          accent: "#2A9D8F",     // Teal
          neutral: "#264653",    // Dark Blue
          "base-100": "#FFFFFF", // White
          info: "#2196F3",       // Blue
          success: "#4CAF50",    // Green
          warning: "#FFC107",    // Yellow
          error: "#F44336",      // Red
        },
      },
    ],
  }
}
