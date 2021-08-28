import { Stats } from '@models/stats'

export async function getStats(username: string): Promise<Stats> {
	const res = await fetch(`https://api.chess.com/pub/player/${username}/stats`)
	return res.json()
}
