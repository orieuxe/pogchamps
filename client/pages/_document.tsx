import NextDocument, { Head, Html, Main, NextScript } from 'next/document'

import { ColorModeScript } from '@chakra-ui/react'
import theme from '@theme/Theme'

export default class Document extends NextDocument {
	render(): JSX.Element {
		return (
			<Html>
				<Head />
				<body>
					<ColorModeScript initialColorMode={theme.config.initialColorMode} />
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
