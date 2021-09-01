import { Flex, Icon, Stack, Text, Tooltip, useColorModeValue } from '@chakra-ui/react'
import { Match } from '@models/match'
import { getTournamentColor } from '@services/TournamentService'
import React, { useState } from 'react'
import { RiSwordFill } from 'react-icons/ri'
import { useGlobal } from 'reactn'
import TimeAgo from 'timeago-react'
import MyImage from './MyImage'
interface Props {
	matchs: Match[]
	onMatchClick: (matchIdx: number) => void
}

function MatchList({ matchs, onMatchClick }: Props) {
	const [selectedTournament] = useGlobal('selectedTournament')
	const [selectedMatchIndex, setSelectedMatchIndex] = useState(0)
	const tournamentColor = getTournamentColor(selectedTournament)
	const winnerColor = useColorModeValue('brand', tournamentColor);

	return (
		<Stack minWidth={{ base: '2xs', md: 'sm' }} spacing={3}>
			{matchs.map((m, i) => {
				let scores = new Array<number>(2)
				let winners = new Array<boolean>(2)
				if (m?.result) {
					scores = m.result.split('-').map(Number)
					winners = scores[0] > scores[1] ? [true, false] : [false, true]
				}
				const selected = i == selectedMatchIndex && m.games.length > 0

				return (
					<Flex
						direction="column"
						key={i}
						onClick={() => {
							setSelectedMatchIndex(i)
							onMatchClick(i)
						}}
						className="clickable bg-color"
						boxShadow="lg"
						rounded="md"
						sx={{
							outlineWidth: 2,
							outlineColor: tournamentColor,
							outlineStyle: selected ? 'solid' : 'none',
						}}
					>
						<Flex alignSelf="center">
							<Text color={winners[0] ? winnerColor : 'default'}>
								{m.participant1.player.twitch}
							</Text>
							<Icon as={RiSwordFill} marginInline={2} />
							<Text color={winners[1] ? winnerColor : 'default'}>
								{m.participant2.player.twitch}
							</Text>
						</Flex>
						<Flex wrap="nowrap" justify="space-between" align="center">
							<MyImage src={`/players/${m.participant1.player.twitch}.png`} width={90} />
							<Stack spacing={3} textAlign="center">
								<Text>
									{m?.date && (
										<Tooltip label={new Date(m?.date).toLocaleString()} placement="top" hasArrow>
											<span>
												<TimeAgo datetime={m?.date} />
											</span>
										</Tooltip>
									)}
								</Text>
								<Text>{m.result}</Text>
							</Stack>
							<MyImage src={`/players/${m.participant2.player.twitch}.png`} width={90} />
						</Flex>
					</Flex>
				)
			})}
		</Stack>
	)
}

export default MatchList
