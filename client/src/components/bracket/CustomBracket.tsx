import { useBreakpointValue } from '@chakra-ui/react'
import GameList from '@components/GameList'
import React, { useEffect, useRef, useState } from 'react'
import { Bracket, RoundProps } from 'react-brackets'
import { useGlobal } from 'reactn'
import { CustomSeed } from './CustomSeed'
import { renderCustomTitle } from './CustomTitle'

interface Props {
	rounds: RoundProps[]
}

function CustomBracket({ rounds }: Props) {
	const [selectedMatch] = useGlobal('selectedMatch')
	const [shownGames, setShownGames] = useState([])
	const bottomRef = useRef<HTMLDivElement>(null)
	const isSm = useBreakpointValue({ base: true, sm: false })

	useEffect(() => {
		if (!selectedMatch) return
		setShownGames(selectedMatch.games)

		const ref = bottomRef.current
		if (!ref) return
		ref.scrollIntoView({ behavior: 'smooth' })
	}, [selectedMatch])

	return (
		<div style={{ display: 'flex', flexDirection: isSm ? 'column' : 'row' }}>
			<Bracket mobileBreakpoint={750} rounds={rounds} roundTitleComponent={renderCustomTitle} renderSeedComponent={CustomSeed} />
			<GameList games={shownGames} />
			<div ref={bottomRef} />
		</div>
	)
}

export default CustomBracket
