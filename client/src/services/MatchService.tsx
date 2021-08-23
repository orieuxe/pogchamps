import { Match } from '@models/match'
import { defaultHeaders } from './BaseService'

export async function getMatchs(): Promise<Match[]> {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API}/duel/all`, defaultHeaders)
	return res.json()
}

export async function getMatchsFrom(group: string, tournamentId: number | string): Promise<Match[]> {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API}/duel/${tournamentId}/from/${group}`, defaultHeaders)
	return res.json()
}

export async function getMatchsFromStage(stage: string, tournamentId: number | string): Promise<Match[]> {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API}/duel/${tournamentId}/stage/${stage}`, defaultHeaders)
	return res.json()
}

export async function getMatchsOf(participantId: number): Promise<Match[]> {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API}/duel/of/${participantId}`, defaultHeaders)
	return res.json()
}

export async function getScheduledMatchs(date: Date): Promise<Match[]> {
	const strDate = date.toISOString().slice(0, 10)
	const res = await fetch(`${process.env.NEXT_PUBLIC_API}/duel/schedule/${strDate}`, defaultHeaders)
	return res.json()
}
