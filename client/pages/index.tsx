import { Text, Box, Flex, Stack, useBreakpointValue, Icon } from '@chakra-ui/react'
import { DatePicker } from '@components/datepicker/DatePicker'
import GameList from '@components/GameList'
import Loading from '@components/Loading'
import MatchList from '@components/MatchList'
import { Match } from '@models/match'
import { Tournament } from '@models/tournament'
import { getScheduledMatchs } from '@services/MatchService'
import { getTournament } from '@services/TournamentService'
import React, { useEffect, useRef, useState } from 'react'
import { useGlobal } from 'reactn'
import { BiSad } from 'react-icons/bi'

export default function Index() {
	const [tournamentId] = useGlobal('selectedTournament')
	const [selectedTournament, setSelectedTournament] = useState<Tournament>()
	const bottomRef = useRef<HTMLDivElement>(null)

	const today = new Date()
	today.setHours(0,0,0,0);
	const [date, setDate] = useState<Date>(today)

	const [matchs, setMatchs] = useState<Match[]>()
	const [currentMatch, setCurrentMatch] = useState<Match>()

	const isLg = useBreakpointValue({ base: true, lg: false })

	useEffect(() => {
		getTournament(tournamentId).then((tournament) => {
			setSelectedTournament(tournament)
			const startDate = new Date(tournament.start_date)
			const endDate = new Date(tournament.end_date)
			const date = endDate < today || today < startDate ? startDate : today
			updateSchedule(date)
		})
	}, [tournamentId])

	useEffect(() => {
		const ref = bottomRef.current
		if (!ref) return
		ref.scrollIntoView({ behavior: 'smooth' })
	}, [currentMatch])

	const updateSchedule = async (date: Date | null) => {
		if (!date) return
		setDate(date)
		setCurrentMatch(undefined)
		const matchs = await getScheduledMatchs(date)
		setMatchs(matchs)
		if (matchs.length > 0) setCurrentMatch(matchs[0])
	}

	if (!selectedTournament) return <Loading />
	return (
		<Stack spacing={3}>
			<DatePicker
				onChangeRaw={(e) => e.preventDefault()}
				minDate={new Date(selectedTournament.start_date)}
				maxDate={new Date(selectedTournament.end_date)}
				selected={date}
				onChange={updateSchedule}
			/>
			<Flex wrap="wrap">
				{matchs && matchs.length > 0 ? (
					<MatchList matchs={matchs} onMatchClick={(idx) => setCurrentMatch(matchs[idx])} />
				) : (
					<Text color="white">
						<Icon height={10} as={BiSad} /> No matchs{' '}
						{date.toDateString() == today.toDateString()
							? 'today.'
							: date < today
							? 'played.'
							: 'announced yet !'}
					</Text>
				)}
				<Box marginLeft={!isLg ? 4 : 0} marginTop={isLg ? 4 : 0}>
					{currentMatch && <GameList games={currentMatch.games} />}
				</Box>
			</Flex>
			<div ref={bottomRef} />
		</Stack>
	)
}
