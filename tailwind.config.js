/** @type {import('tailwindcss').Config} */

const config = {
  important: true,
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  content: [],
  theme: {
    extend: {
      width: {
        '700px': '700px',
      },
      minWidth: {
        '1350px': '1350px',
      },
      maxWidth: {
        '1350px': '1350px',
      },
      height: {
        '4.5': '4.5rem',
      },
      padding: {
        '30': '1.875rem',
      },
      colors: {
        'borderGray': '#CFCFCF',
        'lightGreen': '#9CB395',
      },
      fontSize: {
        '16px': '16px',
      },
      borderRadius: {
        '10px': '10px',
      },
      margin: {
        '0auto': '0 auto',
      }
    },
    fontFamily: {
      NotoSansKR: ['NotoSansKR'],
    }
  },
  plugins: [],
}

export default config;

