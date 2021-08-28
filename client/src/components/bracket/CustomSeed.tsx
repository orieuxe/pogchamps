import { Box, Text, Tooltip, useColorModeValue } from '@chakra-ui/react'
import MyImage from '@components/MyImage'
import { Match } from '@models/match'
import { Player } from '@models/player'
import { getTournamentColor } from '@services/TournamentService'
import React from 'react'
import { RenderSeedProps, Seed, SeedItem, SeedTeam } from 'react-brackets'
import { setGlobal, useGlobal } from 'reactn'
import TimeAgo from 'timeago-react'

interface Props {
	player: Player
	score: number
	winner: boolean
}
export const CustomSeed = ({ seed, breakpoint }: RenderSeedProps) => {
	const m = seed as Match

	let scores = new Array<number>(2)
	let winners = new Array<boolean>(2)
	if (m?.result) {
		scores = m.result.split('-').map(Number)
		winners = scores[0] > scores[1] ? [true, false] : [false, true]
	}

	const onSeedClicked = () => {
		setGlobal({
			selectedMatch: m,
		})
	}

	return (
		<Seed mobileBreakpoint={breakpoint} style={{ fontSize: 16, color: 'white'}}>
			{m?.date && (
				<Tooltip label={new Date(m?.date).toLocaleString()} placement="top" hasArrow>
					<span>
						<TimeAgo datetime={m?.date} />
					</span>
				</Tooltip>
			)}

			<SeedItem style={{ backgroundColor: 'transparent' }}>
				<Box className="bg-color clickable" boxShadow="dark-lg" rounded="lg" onClick={() => onSeedClicked()}>
					<CustomSeedTeam player={m?.participant1?.player} score={scores[0]} winner={winners[0]} />
					<CustomSeedTeam player={m?.participant2?.player} score={scores[1]} winner={winners[1]} />
				</Box>
			</SeedItem>
		</Seed>
	)
}

const CustomSeedTeam = ({ player, score, winner }: Props) => {
	const [tournament] = useGlobal('selectedTournament')
	const winnerColor = useColorModeValue('brand', getTournamentColor(tournament))

	return (
		<SeedTeam style={{ color: winnerColor }}>
			<MyImage src={`/players/${player?.twitch}.png`} width={32} />
			<Text className={!winner ? 'text-color' : ''} color={winner ? winnerColor : 'default'}>
				{player?.twitch}
			</Text>
			<Text className={!winner ? 'text-color' : ''} color={winner ? winnerColor : 'default'}>
				{score}
			</Text>
		</SeedTeam>
	)
}
