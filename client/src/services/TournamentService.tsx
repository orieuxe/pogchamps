export function getTournamentCount() {
	return Number(process.env.NEXT_PUBLIC_TOURNAMENT_COUNT)
}
export function getTournaments() {
	return Array.from({ length: getTournamentCount() }, (_, i) => i + 1)
}

const tournamentColors = ['#DCC9FF', '#FFB278', '#26DBBC', '#F9FE56']
export function getTournamentColor(tournament: number | string): string {
	const tournamentId = Number(tournament)
	if (tournamentColors.length < tournamentId) return 'black'
	return tournamentColors[tournamentId - 1]
}
