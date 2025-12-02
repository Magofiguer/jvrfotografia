import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
    // aquí puedes añadir cualquier otra cosa que tuvieras en .eslintignore
    // por ejemplo:
    // "eslint.config.backup.*",
  ]),
]);

export default eslintConfig;

