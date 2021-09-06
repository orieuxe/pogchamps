import { Box, Grid, useBreakpointValue } from '@chakra-ui/react'
import Standings from '@components/Standings'
import { Participant } from '@models/participant'
import { getParticipantsFrom } from '@services/ParticipantService'
import { getTournamentIds } from '@services/TournamentService'
import React from 'react'
import { Text } from '@chakra-ui/react'
interface Props {
	data: Participant[][]
	total: number
}

export default function Participants({ data, total }: Props) {
	const isMd = useBreakpointValue({ base: true, md: false })

	return total > 0 ? (
		<Grid templateColumns={`repeat(${isMd ? 1 : 2}, minmax(310px, 1fr))`} gap={10}>
			{data.map(
				(participants, i: number) =>
					participants.length > 0 && (
						<Box key={i}>
							<Standings key={i} participants={participants}></Standings>
						</Box>
					)
			)}
		</Grid>
	) : (
		<Text>Groupstage are not published yet !</Text>
	)
}

interface Params {
	params: {
		tournament: string
	}
}

export async function getStaticProps({ params }: Params) {
	const data: Participant[][] = []
	let total = 0
	const groupNames = ['A', 'B', 'C', 'D']
	for (const g of groupNames) {
		const participants = await getParticipantsFrom(params.tournament, g)
		total += participants.length
		data.push(participants)
	}

	if (data == []) {
		return {
			notFound: true,
		}
	}

	return {
		props: { data, total },
		revalidate: 30,
	}
}

export async function getStaticPaths() {
	const tournamentIds = getTournamentIds()
	return {
		paths: tournamentIds.map((e) => {
			return { params: { tournament: String(e) } }
		}),
		fallback: false,
	}
}
