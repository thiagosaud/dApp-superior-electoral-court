module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		jest: true,
	},
	extends: [
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:import/typescript",
		"plugin:prettier/recommended",
		"eslint:recommended",
		"airbnb-base",
		"airbnb-typescript/base",
		"prettier",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: "./tsconfig.json",
		tsconfigRootDir: __dirname,
		ecmaVersion: "latest",
		sourceType: "module",
	},
	settings: {
		"import/resolver": {
			typescript: {},
			node: {
				paths: ["src"],
				extensions: [".ts"],
			},
		},
		jest: {
			version: "detect",
		},
	},
	plugins: ["prettier", "eslint-plugin-import-helpers", "@typescript-eslint"],
	rules: {
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/no-use-before-define": "off",
		"@typescript-eslint/no-unused-vars": ["error"],
		"import/no-extraneous-dependencies": "off",
		"import/extensions": ["error", "ignorePackages", { ts: "never" }],
		"prettier/prettier": [
			"error",
			{ endOfLine: "auto" },
			{
				usePrettierrc: true,
				fileInfoOptions: {
					withNodeModules: true,
				},
			},
		],
	},
};
