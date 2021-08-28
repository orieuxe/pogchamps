import { Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue } from '@chakra-ui/react'
import CustomBracket from '@components/bracket/CustomBracket'
import { Match } from '@models/match'
import { getMatchsFromStage } from '@services/MatchService'
import { getTournamentColor, getTournamentIds } from '@services/TournamentService'
import React from 'react'
import { RoundProps } from 'react-brackets'
import { useGlobal } from 'reactn'

interface Props {
	winnerRounds: RoundProps[]
	loserRounds: RoundProps[]
}

export default function Brackets({ winnerRounds, loserRounds }: Props) {
	const [tournamentId] = useGlobal('selectedTournament')
	const selectedTabColor = useColorModeValue('brand', getTournamentColor(tournamentId))

	return (
		<Tabs isFitted>
			<TabList>
				<Tab _selected={{ color: selectedTabColor, borderColor: selectedTabColor }} className="bg-color clickable">
					Championship Bracket
				</Tab>
				<Tab _selected={{ color: selectedTabColor, borderColor: selectedTabColor }} className="bg-color clickable">
					Consolation Bracket
				</Tab>
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
	const tournamentIds = getTournamentIds()
	return {
		paths: tournamentIds.map((e) => {
			return { params: { tournament: String(e) } }
		}),
		fallback: false,
	}
}
