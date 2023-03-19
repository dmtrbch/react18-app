/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  plugins: [require("@tailwindcss/forms")],
};
