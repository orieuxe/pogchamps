import { Box, Icon, ListItem, UnorderedList, Text, Stack } from '@chakra-ui/react'
import { Game } from '@models/game'
import React from 'react'
import { useGlobal } from 'reactn'
import { getTournamentColor } from '@services/TournamentService'
import { RiSwordFill } from 'react-icons/ri'
import SmallChessBoard from './chess/SmallChessBoard'
import { formatTimeControl } from './chess/TimeControl'
interface Props {
	games: Game[]
}

export default function GameList({ games }: Props) {
	const [selectedTournament] = useGlobal('selectedTournament')
	const tournamentColor = getTournamentColor(selectedTournament)

	return (
		<UnorderedList>
			{games.map((game, i) => {
				const scores = game.result.split('-').map(Number)
				return (
					<ListItem
						className="clickable"
						key={i}
						style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'space-around', marginBottom: '0.5em', alignSelf: 'center' }}
						boxShadow="dark-lg"
						rounded="md"
						bg="transparent"
            p="2"
					>
						<SmallChessBoard game={game} size={128} />

						<Stack spacing={3} style={{ textAlign: 'center'}}>
							<Box style={{ display: 'flex', alignSelf: 'center' }}>
								<Text color={scores[0] > 0.5 ? tournamentColor : 'default'}>
									{game.white} ({game.whiteelo})
								</Text>
								<Icon as={RiSwordFill} marginInline={2} />
								<Text color={scores[1] > 0.5 ? tournamentColor : 'default'}>
									{game.black} ({game.blackelo})
								</Text>
							</Box>
							<Text>{formatTimeControl(game.timecontrol)}</Text>
							<Text>{game.result}</Text>
							<Text>{game.termination}</Text>
						</Stack>
					</ListItem>
				)
			})}
		</UnorderedList>
	)
}
