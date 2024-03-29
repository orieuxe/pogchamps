import 'focus-visible/dist/focus-visible'
import '@fontsource/inter/400.css'
import '@fontsource/inter/900.css'
import '@components/datepicker/date-picker.css'
import '@theme/styles.css'

import React, { setGlobal, useGlobal } from 'reactn'

import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import PageWrapper from '@components/PageWrapper'
import addReactNDevTools from 'reactn-devtools'
import { getTournamentIds } from '@services/TournamentService'
import theme from 'src/theme/Theme'
import Head from 'next/head'

addReactNDevTools()

const tournamentIds = getTournamentIds()

setGlobal({
	selectedTournament: tournamentIds[tournamentIds.length - 1],
})

function App({ Component, pageProps }: AppProps): JSX.Element {
	const [selectedTournament] = useGlobal('selectedTournament')

	return (
		<ChakraProvider resetCSS theme={theme}>
			<Head>
				<title>
					Pogchamps {selectedTournament}
					{process.env.NEXT_PUBLIC_API?.includes('localhost') ? ' - localhost' : ''}
				</title>
				<link rel="icon" type="image/png" href="/icons/chess.svg" />
			</Head>
			<PageWrapper>
				<Component {...pageProps} />
			</PageWrapper>
		</ChakraProvider>
	)
}

export default App
