import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import CustomBracket from '@components/bracket/CustomBracket'
import { Match } from '@models/match'
import { getMatchsFromStage } from '@services/MatchService'
import { getTournaments } from '@services/TournamentService'
import React from 'react'
import { RoundProps } from 'react-brackets'

interface Props {
	winnerRounds: RoundProps[]
	loserRounds: RoundProps[]
}

export default function Brackets({ winnerRounds, loserRounds }: Props) {
	return (
		<Tabs isFitted variant="soft-rounded" colorScheme="purple">
			<TabList>
				<Tab color="white">Championship Bracket</Tab>
				<Tab color="white">Consolation Bracket</Tab>
			</TabList>
			<TabPanels>
				<TabPanel>
					<CustomBracket rounds={winnerRounds} />
				</TabPanel>
				<TabPanel>
					<CustomBracket rounds={loserRounds} />
				</TabPanel>
			</TabPanels>
		</Tabs>
	)
}

interface Params {
	params: {
		tournament: string
	}
}

export async function getStaticProps({ params }: Params) {
	const buildRoundProps = (bracket: Match[]): RoundProps[] => {
		return [
			{
				title: 'Quarterfinals',
				seeds: [bracket[0] || null, bracket[1] || null, bracket[2] || null, bracket[3] || null],
			},
			{
				title: 'Semifinals',
				seeds: [bracket[0]?.next_duel || null, bracket[2]?.next_duel || null],
			},
			{
				title: 'Finals',
				seeds: [bracket[0]?.next_duel?.next_duel || null],
			},
		]
	}

	const loserRounds = buildRoundProps(await getMatchsFromStage(params.tournament, 'loser'))
	const winnerRounds = buildRoundProps(await getMatchsFromStage(params.tournament, 'winner'))

	if (!winnerRounds || !loserRounds) {
		return {
			notFound: true,
		}
	}

	return {
		props: { winnerRounds, loserRounds },
		revalidate: 30,
	}
}

export async function getStaticPaths() {
	const tournaments = getTournaments()
	return {
		paths: tournaments.map((e) => {
			return { params: { tournament: String(e) } }
		}),
		fallback: false,
	}
}
