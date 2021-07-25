import { Participant } from '@models/participant'
import { getTournaments } from '@services/Tournaments'

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
	const res = await fetch(`${process.env.NEXT_PUBLIC_API}/participant/${params.tournament}/all`, { mode: 'cors' })
	const data = await res.json()

	if (!data) {
		return {
			notFound: true,
		}
	}

	return {
		props: { data },
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
