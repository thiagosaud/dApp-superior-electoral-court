module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		jest: true,
	},
	extends: [
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:import/typescript',
		'plugin:jest/recommended',
		'plugin:jest-dom/recommended',
		'plugin:testing-library/react',
		'plugin:jsx-a11y/recommended',
		'plugin:prettier/recommended',
		'eslint:recommended',
		'airbnb',
		'airbnb/hooks',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
		ecmaVersion: 'latest',
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	settings: {
		'import/resolver': {
			typescript: {},
			node: {
				paths: ['src'],
				extensions: ['.ts', '.tsx'],
				moduleDirectory: ['src', 'node_modules'],
			},
		},
		react: {
			version: 'detect',
		},
		jest: {
			version: 'detect',
		},
	},
	plugins: ['react', 'react-hooks', 'prettier', 'eslint-plugin-import-helpers', '@typescript-eslint'],
	rules: {
		'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
		'react/prop-types': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/jsx-props-no-spreading': 'off',
		'react/jsx-uses-react': 'off',
		'react/no-unused-vars': 'off',
		'react/no-unused-prop-types': 'off',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-use-before-define': 'off',
		'@typescript-eslint/no-unused-vars': ['error'],
		'import/no-extraneous-dependencies': 'off',
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				js: 'never',
				jsx: 'never',
				ts: 'never',
				tsx: 'never',
			},
		],
		'prettier/prettier': [
			'error',
			{ endOfLine: 'auto' },
			{
				usePrettierrc: true,
				fileInfoOptions: {
					withNodeModules: true,
				},
			},
		],
	},
};
