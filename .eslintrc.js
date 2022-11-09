/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  env: {
    es6: true,
    es2020: true,
  },
  root: true,
  plugins: ["tailwindcss"],
  extends: [
    "next",
    "prettier",
    "plugin:tailwindcss/recommended",
    "plugin:react/recommended",
    "eslint:recommended",
  ],
  rules: {
    // suppress errors for missing 'import React' in files
    "react/react-in-jsx-scope": "off",
    // allow jsx syntax in js files (for next.js project)
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".tsx", ".ts"] },
    ], //should add ".ts" if typescript project
    "react/prop-types": "off",
    "no-unused-vars": "warn",
    "no-mixed-spaces-and-tabs": "off",
  },
  globals: {
    React: true,
  },
};
