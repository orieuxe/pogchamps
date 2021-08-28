import { Box, Flex, Icon, Link, Stack, Text, useBreakpointValue, useColorModeValue } from '@chakra-ui/react'
import { Game } from '@models/game'
import { getTournamentColor } from '@services/TournamentService'
import React from 'react'
import { RiSwordFill } from 'react-icons/ri'
import { useGlobal } from 'reactn'
import SmallChessBoard from './chess/SmallChessBoard'
import { formatTimeControl } from './chess/TimeControl'
interface Props {
	games: Game[]
}

export default function GameList({ games }: Props) {
	const [selectedTournament] = useGlobal('selectedTournament')
	const winnerColor = useColorModeValue('brand', getTournamentColor(selectedTournament))

	const isSm = useBreakpointValue({ base: true, sm: false })

	return (
		<Stack spacing={3}>
			{games.map((game, i) => {
				const scores = game.result.split('-').map(Number)
				return (
					<Link key={i} href={game.url} target="_blank" rel="noreferrer">
						<Flex
							align="center"
							justify="space-around"
							p="1vw"
							wrap="nowrap"
							className="clickable bg-color"
							boxShadow="lg"
							rounded="md"
						>
							<SmallChessBoard game={game} size={128} />

							<Stack spacing={3} textAlign="center" marginLeft="1">
								<Box style={{ display: 'flex', alignItems: 'center', flexDirection: isSm ? 'column' : 'row' }}>
									<Text adjustsFontSizeToFit color={scores[0] > 0.5 ? winnerColor : 'default'}>
										{game.white} ({game.whiteelo})
									</Text>
									<Icon as={RiSwordFill} marginInline={1} />
									<Text adjustsFontSizeToFit color={scores[1] > 0.5 ? winnerColor : 'default'}>
										{game.black} ({game.blackelo})
									</Text>
								</Box>
								<Text>{formatTimeControl(game.timecontrol)}</Text>
								<Text>{game.termination}</Text>
							</Stack>
						</Flex>
					</Link>
				)
			})}
		</Stack>
	)
}
