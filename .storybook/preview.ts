import type { Preview } from '@storybook/react'
import './storybook-fonts.scss'
import '../src/app/globals.scss'

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
}

export default preview
