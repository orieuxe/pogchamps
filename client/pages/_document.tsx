import NextDocument, { Head, Html, Main, NextScript } from 'next/document'

import { ColorModeScript } from '@chakra-ui/react'

export default class Document extends NextDocument {
	render(): JSX.Element {
		return (
			<Html>
				<Head />
				<body>
					<ColorModeScript />
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
