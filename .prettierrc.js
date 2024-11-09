/** @type {import("prettier").Options} */
const config = {
	useTabs: true,
	singleQuote: true,
	trailingComma: 'none',
	printWidth: 100,
	bracketSameLine: true,
	plugins: ['@trivago/prettier-plugin-sort-imports'],
	importOrder: ['^@/(.*)$', '^[./]'],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true
};

module.exports = config;
