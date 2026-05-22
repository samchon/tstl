// Flat ESLint config for the ttsc benchmark (B3): the 12 shared lint rules,
// matching the ttsc-lint branch's lint.config.ts `rules` block.
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default [
  {
    files: ["src/**/*.ts"],
    linterOptions: { reportUnusedDisableDirectives: "off" },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: { "@typescript-eslint": tsPlugin },
    rules: {
      "no-var": "error",
      "prefer-const": "error",
      eqeqeq: "error",
      "object-shorthand": "error",
      "no-unneeded-ternary": "error",
      "prefer-template": "error",
      "no-useless-rename": "error",
      "dot-notation": "error",
      "no-extra-boolean-cast": "error",
      "no-useless-escape": "error",
      "@typescript-eslint/prefer-as-const": "error",
      "@typescript-eslint/prefer-namespace-keyword": "error",
    },
  },
];
