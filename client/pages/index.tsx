import { Box, Flex, Stack } from '@chakra-ui/react'
import { DatePicker } from '@components/datepicker/DatePicker'
import GameList from '@components/GameList'
import Loading from '@components/Loading'
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

	const today = new Date()
	const [date, setDate] = useState<Date>(today)
	const [matchs, setMatchs] = useState<Match[]>()
	const [currentMatch, setCurrentMatch] = useState<Match>()

	useEffect(() => {
		getTournament(tournamentId).then((tournament) => {
			setSelectedTournament(tournament)
			const endDate = new Date(tournament.end_date)
			const startDate = new Date(tournament.start_date)
			if (endDate < today || today < startDate) updateSchedule(startDate)
		})
	}, [tournamentId])

	const updateSchedule = async (date: Date | null) => {
		if (!date) return
		setDate(date)
		setCurrentMatch(undefined)
		setMatchs(await getScheduledMatchs(date))
	}

	if (!selectedTournament) return <Loading />

	return (
		<Stack spacing={3}>
			<DatePicker
				maxDate={new Date(selectedTournament.end_date)}
				minDate={new Date(selectedTournament.start_date)}
				selected={date}
				onChange={updateSchedule}
			/>
			<Flex>
				{matchs && <MatchList matchs={matchs} onMatchClick={(idx) => setCurrentMatch(matchs[idx])} />}
				{currentMatch && <GameList games={currentMatch.games} />}
			</Flex>
		</Stack>
	)
}
