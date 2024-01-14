import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-actions',
		'@storybook/addon-interactions',
		{
			name: '@storybook/addon-storysource',
			options: {
				rule: {
					test: [/\.stories\.tsx?$/],
				},
				loaderOptions: {
					prettierConfig: {
						printWidth: 80,
						singleQuote: false,
						options: { parser: 'typescript' },
					},
				},
			},
		},
	],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
	docs: {
		autodocs: 'tag',
	},
}
export default config
