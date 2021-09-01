import {
	Box,
	Flex, Icon,
	Spacer,
	Text,
	Tooltip,
	useBreakpointValue,
	useColorMode
} from '@chakra-ui/react'
import GameList from '@components/GameList'
import { GroupButton } from '@components/GroupButton'
import MatchList from '@components/MatchList'
import { Match } from '@models/match'
import { Participant } from '@models/participant'
import { Stats } from '@models/stats'
import { getStats } from '@services/ChesscomService'
import { getMatchsOf } from '@services/MatchService'
import { getAllParticipants, getParticipant } from '@services/ParticipantService'
import { getTournamentColor, getTournamentIds } from '@services/TournamentService'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { FaBolt, FaBullseye, FaClock } from 'react-icons/fa'
import { useGlobal } from 'reactn'
interface Props {
	participant: Participant
	matchs: Match[]
	stats: Stats
}
export default function Player({ participant, matchs, stats }: Props) {
	const player = participant.player
	const [selectedTournament] = useGlobal('selectedTournament')
	const isHidden = useBreakpointValue([true, false])
	const { colorMode } = useColorMode()

	const [shownMatchIndex, setShownMatchIndex] = useState(0)
	const bottomRef = useRef<HTMLDivElement>(null);

	const isLg = useBreakpointValue({ base: true, lg: false });

	useEffect(() => setShownMatchIndex(shownMatchIndex), [matchs])

	useEffect(() => {
		const ref = bottomRef.current;
		if(!ref) return;
		ref.scrollIntoView({ behavior: 'smooth' })
	}, [shownMatchIndex])

	return (
		<>
			<Flex className="bg-color" marginTop="8" flexWrap="wrap" rounded="md">
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
						<GroupButton selectedTournament={selectedTournament} group={participant.groupe} isHidden={isHidden} />
					</Flex>
				</Flex>
				<Box
					position="relative"
					backgroundColor={getTournamentColor(selectedTournament)}
					minWidth={['100%', '288px']}
					height={['64px', '256px']}
					borderTopRightRadius={'md'}
				>
					<GroupButton selectedTournament={selectedTournament} group={participant.groupe} isHidden={!isHidden} />
					<Box position="absolute" right="0" bottom="0" width={['128px', '288px']} height={['128px', '288px']}>
						<Image src={`/players/${player.twitch}.png`} layout="fill" objectFit="cover"></Image>
					</Box>
				</Box>
			</Flex>

			<Flex marginTop="8" wrap="wrap">
				<MatchList matchs={matchs} onMatchClick={(idx) => setShownMatchIndex(idx)}></MatchList>
				<Spacer/>
				<Box marginTop={isLg ? 4 : 0}>
					{matchs[shownMatchIndex] && <GameList games={matchs[shownMatchIndex].games}></GameList>}
					<div ref={bottomRef} />
				</Box>
			</Flex>
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
	const tournamentIds = getTournamentIds()

	const paths = {
		paths: await Promise.all(
			tournamentIds.map(async (e) => {
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
