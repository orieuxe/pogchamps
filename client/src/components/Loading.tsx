import { Center } from '@chakra-ui/react'
import { getTournamentColor } from '@services/TournamentService'
import React from 'react'
import { ThreeDots } from 'react-loading-icons'
import { useGlobal } from 'reactn'

function Loading() {
	const [tournamentId] = useGlobal('selectedTournament')
	const color = getTournamentColor(tournamentId)

	return (
    <Center height="50vh">
      <ThreeDots fill={color} />
    </Center>
	)
}

export default Loading
