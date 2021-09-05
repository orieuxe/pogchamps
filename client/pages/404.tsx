import { getTournamentCount, getTournamentIds } from '@services/TournamentService'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useGlobal } from 'reactn'

export default function Custom404() {
	const router = useRouter()
	const [selectedTournament, setSelectedTournament] = useGlobal('selectedTournament')
	const tournamentIds = getTournamentIds()
  const tournamentCount = getTournamentCount()

	useEffect(() => {
		const tournamentId = tournamentIds.includes(selectedTournament) ? selectedTournament : tournamentCount
		setSelectedTournament(tournamentId)
		router.replace(`/participants/${tournamentId}`)
	}, [selectedTournament])

	return null
}
