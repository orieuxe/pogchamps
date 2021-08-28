import { Button, Link } from '@chakra-ui/react'
import React from 'react'

interface Props {
	group: string | undefined;
	selectedTournament: number
	isHidden?: boolean;
}

export const GroupButton = ({ group, selectedTournament, isHidden }: Props) => {
	if (group && !isHidden) {
		return (
			<Link href={`/group/${selectedTournament}/${group}`}>
				<Button colorScheme="purple" mt="3" ml="3">
					Group {group}
				</Button>
			</Link>
		)
	} else {
		return null
	}
}
