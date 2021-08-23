import {
	Accordion,
	AccordionButton,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	Flex,
	Icon,
	Spacer,
	Text,
	Tooltip,
	useBreakpointValue,
	useColorMode,
} from '@chakra-ui/react'
import { FaBolt, FaBullseye, FaClock } from 'react-icons/fa'
import { getAllParticipants, getParticipant } from '@services/ParticipantService'

import { Game } from '@models/game'
import GameList from '@components/GameList'
import Image from 'next/image'
import Link from 'next/link'
import { Match } from '@models/match'
import { Participant } from '@models/participant'
import React from 'react'
import { Stats } from '@models/stats'
import { getMatchsOf } from '@services/MatchService'
import { getStats } from '@services/ChesscomService'
import { getTournaments } from '@services/TournamentService'
import { useGlobal } from 'reactn'

interface PropsGB {
	participant: Participant
	selectedTournament: number
	isHidden: boolean
}
const GroupButton = ({ participant, selectedTournament, isHidden }: PropsGB) => {
	if (participant.groupe && !isHidden) {
		return (
			<Link href={`/group/${selectedTournament}/${participant.groupe}`}>
				<Button colorScheme="purple" mt="3" ml="3">
					Group {participant.groupe}
				</Button>
			</Link>
		)
	} else {
		return null
	}
}
interface Props {
	participant: Participant
	matchs: Match[]
	stats: Stats
}
export default function Player({ participant, matchs, stats }: Props) {
	const player = participant.player
	const [selectedTournament] = useGlobal('selectedTournament')
	const bgColor = ['#DCC9FF', '#FFB278', '#26DBBC', '#F9FE56']
	const isHidden = useBreakpointValue([true, false])
	const { colorMode } = useColorMode()

	return (
		<>
			<Flex className="bg-color" marginTop="8" flexWrap="wrap">
				<Flex direction="column" flex="1" height="256px" p="4" minWidth="300px">
					<Text fontSize="3xl" fontWeight="semibold" color={colorMode == 'light' ? 'purple' : 'white'}>
						{player.username}
					</Text>
					<Text color="teal.300">
						<a href={`https://www.twitch.tv/${player.twitch}`} target="_blank" rel="noreferrer">
							{`twitch.tv/${player.twitch}`}
						</a>
					</Text>
					<Text color="teal.300">
						<a
							href={`https://www.chess.com/member/${player.username.toLowerCase()}`}
							target="_blank"
							rel="noreferrer"
						>
							{`chess.com/member/${player.username.toLowerCase()}`}
						</a>
					</Text>
					<Spacer />
					<Flex direction="row" alignItems="end">
						<ul>
							{stats.chess_rapid && (
								<li style={{ display: 'flex', whiteSpace: 'nowrap' }}>
									<Tooltip label="rapid rating">
										<span>
											<Icon as={FaClock} />
										</span>
									</Tooltip>
									<Text ml="2">
										{stats.chess_rapid?.last?.rating} Best {stats.chess_rapid?.best?.rating}
									</Text>
								</li>
							)}
							{stats.chess_blitz && (
								<li style={{ display: 'flex', whiteSpace: 'nowrap' }}>
									<Tooltip label="blitz rating">
										<span>
											<Icon as={FaBolt} />
										</span>
									</Tooltip>

									<Text ml="2">
										{stats.chess_blitz?.last?.rating} Best {stats.chess_blitz?.best?.rating}
									</Text>
								</li>
							)}
							{stats.chess_bullet && (
								<li style={{ display: 'flex', whiteSpace: 'nowrap' }}>
									<Tooltip label="bullet rating">
										<span>
											<Icon as={FaBullseye} />
										</span>
									</Tooltip>
									<Text ml="2">
										{stats.chess_bullet?.last?.rating} Best {stats.chess_bullet?.best?.rating}
									</Text>
								</li>
							)}
						</ul>
						<Spacer />
						<GroupButton selectedTournament={selectedTournament} participant={participant} isHidden={isHidden} />
					</Flex>
				</Flex>
				<Box
					position="relative"
					backgroundColor={bgColor[selectedTournament - 1]}
					minWidth={['100%', '288px']}
					height={['64px', '256px']}
				>
					<GroupButton selectedTournament={selectedTournament} participant={participant} isHidden={!isHidden} />
					<Box position="absolute" right="0" bottom="0" width={['128px', '288px']} height={['128px', '288px']}>
						<Image src={`/players/${player.twitch}.png`} layout="fill" objectFit="cover"></Image>
					</Box>
				</Box>
			</Flex>

			<Box className="bg-color" marginTop="8" flexWrap="wrap">
				<Accordion allowToggle allowMultiple>
					{matchs.map((match, i) => (
						<AccordionItem key={i}>
							<h2>
								<AccordionButton>
									<Box flex="1" textAlign="left">
										{match.participant1.player.twitch} vs {match.participant2.player.twitch}
									</Box>
								</AccordionButton>
							</h2>
							<AccordionPanel pb={4}>
								<GameList games={match.games}></GameList>
							</AccordionPanel>
						</AccordionItem>
					))}
				</Accordion>
			</Box>
		</>
	)
}

interface Params {
	params: {
		tournament: string
		twitch: string
	}
}

export async function getStaticProps({ params }: Params) {
	const participant = await getParticipant(params.tournament, params.twitch)
	if (participant == null) {
		return {
			notFound: true,
		}
	}

	const matchs = await getMatchsOf(participant.id)
	const stats = await getStats(participant.player.username)

	return {
		props: { participant, matchs, stats },
		revalidate: 30,
	}
}

export async function getStaticPaths() {
	const tournaments = getTournaments()

	const paths = {
		paths: await Promise.all(
			tournaments.map(async (e) => {
				const participants: Participant[] = await getAllParticipants(e)
				return participants.map((p) => ({
					params: {
						tournament: String(e),
						twitch: p.player.twitch,
					},
				}))
			})
		).then((nestedArrays: any[]) => [].concat(...nestedArrays)),
		fallback: false,
	}
	return paths
}
