// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "color-background-brand-default": "var(--color-background-brand-default)",
        "color-background-brand-hover": "var(--color-background-brand-hover)",
        "color-background-default-default": "var(--color-background-default-default)",
        "color-background-disabled-default": "var(--color-background-disabled-default)",
        "color-background-neutral-tertiary": "var(--color-background-neutral-tertiary)",
        "color-background-neutral-tertiary-hover": "var(--color-background-neutral-tertiary-hover)",
        "color-border-danger-default": "var(--color-border-danger-default)",
        "color-border-default-default": "var(--color-border-default-default)",
        "color-border-disabled-secondary": "var(--color-border-disabled-secondary)",
        "color-border-neutral-secondary": "var(--color-border-neutral-secondary)",
        "color-primitives-brand-800": "var(--color-primitives-brand-800)",
        "color-primitives-gray-300": "var(--color-primitives-gray-300)",
        "color-primitives-gray-400": "var(--color-primitives-gray-400)",
        "color-primitives-red-700": "var(--color-primitives-red-700)",
        "color-primitives-slate-300": "var(--color-primitives-slate-300)",
        "color-primitives-slate-400": "var(--color-primitives-slate-400)",
        "color-primitives-slate-600": "var(--color-primitives-slate-600)",
        "color-text-brand-on-brand": "var(--color-text-brand-on-brand)",
        "color-text-default-default": "var(--color-text-default-default)",
        "color-text-default-tertiary": "var(--color-text-default-tertiary)",
        "color-text-disabled-default": "var(--color-text-disabled-default)",
        "color-text-disabled-on-disabled": "var(--color-text-disabled-on-disabled)",
        "color-text-neutral-default": "var(--color-text-neutral-default)",
      },
      fontFamily: {
        "body-base": "var(--body-base-font-family)",
        "body-link": "var(--body-link-font-family)",
        "single-line-body-base": "var(--single-line-body-base-font-family)",
        "title-hero": "var(--title-hero-font-family)",
      },
    },
  },
  plugins: [],
};