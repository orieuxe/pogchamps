import { Participant } from '@models/participant'
import { getTournaments } from '@services/Tournament'

interface Props {
	data: Participant[]
}

export default function Participants({ data }: Props) {
	return <div>{JSON.stringify(data)}</div>
}

interface Params {
	params: {
		tournament: string
	}
}

export async function getStaticProps({ params }: Params) {
	const res1 = await fetch(`${process.env.NEXT_PUBLIC_API}/duel/${params.tournament}/stage/winner`, { mode: 'cors' })
	const winner = await res1.json()
	const res2 = await fetch(`${process.env.NEXT_PUBLIC_API}/duel/${params.tournament}/stage/loser`, { mode: 'cors' })
	const loser = await res2.json()

	if (!winner || !loser) {
		return {
			notFound: true,
		}
	}

	return {
		props: { data: { winner, loser } },
		revalidate: 30,
	}
}

export async function getStaticPaths() {
	const tournaments = getTournaments()
	return {
		paths: tournaments.map((e) => {
			return { params: { tournament: String(e) } }
		}),
		fallback: false,
	}
}
