import 'focus-visible/dist/focus-visible'
import '@fontsource/inter/400.css'
import '@fontsource/inter/900.css'

import React, { setGlobal } from 'reactn'

import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import PageWrapper from '@components/PageWrapper'
import addReactNDevTools from 'reactn-devtools'
import theme from 'src/theme/Theme'

addReactNDevTools()

setGlobal({
	selectedTournament: 3,
})

function App({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<ChakraProvider resetCSS theme={theme}>
			<PageWrapper>
				<Component {...pageProps} />
			</PageWrapper>
		</ChakraProvider>
	)
}

export default App
