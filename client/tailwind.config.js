// See https://tailwindcss.com/docs/configuration for details
module.exports = {
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  // purge: ["./src/**/*.js"],
  theme: {
    extend: {
      textColor: {
        primary: "var(--color-text-primary)",
        secondary: "var(--color-text-secondary)",
        link: "var(--color-text-link)",
      },
      backgroundColor: {
        primary: "var(--color-bg-primary)",
        "primary-light": "var(--color-bg-primary-light)",
        secondary: "var(--color-bg-secondary)",
        "secondary-light": "var(--color-bg-secondary-light)",
      },
      borderColor: {
        primary: "var(--color-bg-primary)",
        secondary: "var(--color-bg-secondary)",
      },
      scale: {
        '200': '2',
        '400': '4',
        '600': '6',
      },
      screens: {
        'xxl': { 'min': '1600px' },
      }
    },
  },
  variants: {},
  plugins: [
    require("tailwindcss"),
    require("postcss-nested"),
    require("autoprefixer"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/custom-forms"),
  ],
}