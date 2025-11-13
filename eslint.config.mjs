// eslint.config.js
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
	{
		rules: {
			// ❌ Disable the base rule — it breaks with TypeScript enums
			"no-unused-vars": "off",

			// ✅ Use the TypeScript-aware rule
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					vars: "all",
					args: "after-used",
					ignoreRestSiblings: true,
					varsIgnorePattern: "^_", // ignore _var
					argsIgnorePattern: "^_", // ignore _arg
				},
			],

			// Allow explicit any if you need it (like your lodash util)
			"@typescript-eslint/no-explicit-any": "off",
		},
	},
]);

export default eslintConfig;
