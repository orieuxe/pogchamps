import { createBreakpoints } from '@chakra-ui/theme-tools'
import { extendTheme } from '@chakra-ui/react'

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

const breakpoints = createBreakpoints({
	sm: '40em',
	md: '48em',
	lg: '64em',
	xl: '80em',
	'2xl': '96em',
})

const theme = extendTheme({
	config,
	fonts,
	styles: {
		global: () => ({
			'#__next': {
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'column',
			},
		}),
	},
	shadows: {
		outline: '0px 0px 0px 3px rgba(66,153,225,0.75)',
	},
	breakpoints,
})

export default theme
