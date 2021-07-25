export function getTournamentCount() {
	return Number(process.env.NEXT_PUBLIC_TOURNAMENT_COUNT)
}
export function getTournaments() {
	return Array.from({ length: getTournamentCount() }, (_, i) => i + 1)
}
