import { Tournament } from "@models/tournament"
import { defaultHeaders } from "./BaseService"

export function getTournamentCount() {
	return Number(process.env.NEXT_PUBLIC_TOURNAMENT_COUNT)
}
export function getTournamentIds() {
	return Array.from({ length: getTournamentCount() }, (_, i) => i + 1)
}

const tournamentColors = ['#DCC9FF', '#FFB278', '#26DBBC', '#F9FE56']
export function getTournamentColor(tournament: number | string): string {
	const tournamentId = Number(tournament)
	if (tournamentColors.length < tournamentId) return 'black'
	return tournamentColors[tournamentId - 1]
}

export async function getTournaments(): Promise<Tournament[]> {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API}/tournaments`, defaultHeaders)
	return res.json()
}

export async function getTournament(tournamentId: number): Promise<Tournament> {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API}/tournament/${tournamentId}`, defaultHeaders)
	return res.json()
}

export async function getLastTournament(): Promise<Tournament> {
	const tournamentIds = getTournamentIds();
	return getTournament(Number(tournamentIds.pop()));
}
