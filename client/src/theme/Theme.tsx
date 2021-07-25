import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const fonts = {
	heading: 'Inter',
	body: 'Inter',
	mono: `'Menlo', monospace`,
}

const config = {
	initialColorMode: 'light' as const,
	useSystemColorMode: true,
	cssVarPrefix: '',
}

const theme = extendTheme({
	config,
	fonts,
	styles: {
		global: (props) => ({
			'#__next': {
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'column',
				backgroundColor: mode('gray.50', 'gray:800')(props),
			},
		}),
	},
	shadows: {
		outline: '0px 0px 0px 3px rgba(66,153,225,0.75)',
	},
})

export default theme
