import { Box, Icon, ListItem, Stack, Text, Tooltip, UnorderedList } from '@chakra-ui/react'
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

	return (
		<UnorderedList minWidth={{ base: "2xs", md: "sm" }}>
			{matchs.map((m, i) => {
				let scores = new Array<number>(2)
				let winners = new Array<boolean>(2)
				if (m?.result) {
					scores = m.result.split('-').map(Number)
					winners = scores[0] > scores[1] ? [true, false] : [false, true]
				}
				const selected = i == selectedMatchIndex && m.games.length > 0

				return (
					<ListItem
						key={i}
						onClick={() => {
							setSelectedMatchIndex(i)
							onMatchClick(i)
						}}
						className="clickable"
						style={{
							display: 'flex',
							flexDirection: 'column',
							marginBottom: '0.5em',
							opacity: selected ? '0.8' : '1.0',
						}}
						boxShadow="dark-lg"
						rounded="md"
						bg={selected ? 'brand' : 'transparent'}
						color="white"
					>
						<Box style={{ display: 'flex', alignSelf: 'center' }}>
							<Text color={winners[0] ? getTournamentColor(selectedTournament) : 'default'}>
								{m.participant1.player.twitch}
							</Text>
							<Icon as={RiSwordFill} marginInline={2} />
							<Text color={winners[1] ? getTournamentColor(selectedTournament) : 'default'}>
								{m.participant2.player.twitch}
							</Text>
						</Box>
						<Box
							style={{
								display: 'flex',
								flexWrap: 'nowrap',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<MyImage src={`/players/${m.participant1.player.twitch}.png`} width={90} />
							<Stack spacing={3} style={{ textAlign: 'center' }}>
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
						</Box>
					</ListItem>
				)
			})}
		</UnorderedList>
	)
}

export default MatchList
