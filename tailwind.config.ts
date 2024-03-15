import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  safelist: [
    'z-[0]',
    'z-[1]',
    'z-[2]',
    'z-[3]',
    'z-[4]',
    'z-[5]',
    'z-[6]',
    'z-[7]',
    'z-[8]',
    'z-[9]',
    'z-[10]',
    { pattern: /-left-*/ },
  ],
};
