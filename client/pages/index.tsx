import { Box } from '@chakra-ui/react'
import { DatePicker } from '@components/datepicker/DatePicker'
import GameList from '@components/GameList'
import MatchList from '@components/MatchList'
import { Match } from '@models/match'
import { Tournament } from '@models/tournament'
import { getScheduledMatchs } from '@services/MatchService'
import { getTournament } from '@services/TournamentService'
import React, { useEffect, useState } from 'react'
import { useGlobal } from 'reactn'

export default function Index() {
	const [tournamentId] = useGlobal('selectedTournament')

	const [selectedTournament, setSelectedTournament] = useState<Tournament>()

	useEffect(() => {
		getTournament(tournamentId).then(setSelectedTournament)
	}, [tournamentId])

	const today = new Date()
	const [date, setDate] = useState<Date>(today)
	const [matchs, setMatchs] = useState<Match[]>()
	const [currentMatch, setCurrentMatch] = useState<Match>()
	if (!selectedTournament) return <>Loading...</>
	
	return (
		<Box>
			<DatePicker
				maxDate={new Date(selectedTournament.end_date)}
				minDate={new Date(selectedTournament.start_date)}
				selected={date}
				onChange={async (d) => {
					if (!d) return
					const date = d as Date
					setDate(date)
					setCurrentMatch(undefined)
					setMatchs(await getScheduledMatchs(date))
				}}
			/>
			<Box display="flex">
				{matchs && <MatchList matchs={matchs} onMatchClick={(idx) => setCurrentMatch(matchs[idx])} />}
				{currentMatch && <GameList games={currentMatch.games} />}
			</Box>
		</Box>
	)
}
