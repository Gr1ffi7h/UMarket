/**
 * ESLint Configuration
 * 
 * Enforces code quality and consistency
 * Optimized for Next.js App Router and TypeScript
 * Updated for ESLint 9.x compatibility
 */
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      ".next/**",
      ".next/types/**",
      "out/**",
      "dist/**",
      "build/**",
      "*.config.js",
      "*.config.mjs",
    ],
    rules: {
      // Allow any types for flexibility in development
      "@typescript-eslint/no-explicit-any": "off",
      // Allow unused vars with underscore prefix
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      // Allow ts-ignore for specific cases
      "@typescript-eslint/ban-ts-comment": "off",
      // Allow empty object types
      "@typescript-eslint/no-empty-object-type": "off",
      // Allow unsafe function types
      "@typescript-eslint/no-unsafe-function-type": "off",
      // Allow unescaped entities in JSX
      "react/no-unescaped-entities": "off",
    },
  },
];

export default eslintConfig;
