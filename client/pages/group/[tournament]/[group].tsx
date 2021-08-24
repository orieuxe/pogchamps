import { Box, SimpleGrid, Stack } from '@chakra-ui/react'
import GameList from '@components/GameList'
import MatchList from '@components/MatchList'
import Standings from '@components/Standings'
import { Match } from '@models/match'
import { Participant } from '@models/participant'
import { getMatchsFrom } from '@services/MatchService'
import { getParticipantsFrom } from '@services/ParticipantService'
import { getTournaments } from '@services/TournamentService'
import React, { useEffect, useState } from 'react'

interface Props {
	participants: Participant[]
	matchs: Match[]
}

export default function Group({ participants, matchs }: Props) {
	const [shownMatchIndex, setShownMatchIndex] = useState(0)

	useEffect(() => {
		setShownMatchIndex(shownMatchIndex)
	}, [matchs])

	return (
		<SimpleGrid minChildWidth={310} spacing={10}>
			<Box>
				<MatchList matchs={matchs} onMatchClick={(idx) => setShownMatchIndex(idx)}></MatchList>
			</Box>
			<Stack spacing={3}>
				<Standings participants={participants}></Standings>
				{matchs[shownMatchIndex] && <GameList games={matchs[shownMatchIndex].games}></GameList>}
			</Stack>
		</SimpleGrid>
	)
}

interface Params {
	params: {
		tournament: string
		group: string
	}
}

export async function getStaticProps({ params }: Params) {
	const participants = await getParticipantsFrom(params.tournament, params.group)
	if (participants == []) {
		return {
			notFound: true,
		}
	}
	const matchs = await getMatchsFrom(params.group, params.tournament)

	return {
		props: { participants, matchs },
		revalidate: 30,
	}
}

export async function getStaticPaths() {
	const tournaments = getTournaments()

	const paths = {
		paths: await Promise.all(
			tournaments.map(async (e) => {
				return ['A', 'B', 'C', 'D'].map((g) => ({
					params: {
						tournament: String(e),
						group: g,
					},
				}))
			})
		).then((nestedArrays: any[]) => [].concat(...nestedArrays)),
		fallback: false,
	}
	return paths
}
