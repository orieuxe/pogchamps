import { Button, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react'

import { IconType } from 'react-icons'
import Link from 'next/link'
import React from 'react'

interface Props {
	href: string
	text: string
	icon: IconType
}

export default function NavLink({ href, text, icon }: Props): JSX.Element {
	const isIconOnly = useBreakpointValue({ base: true, sm: false })
	return (
		<Link href={href}>
			{isIconOnly ? (
				<IconButton variant="link" aria-label={text} minWidth="4" color="white" icon={<Icon as={icon} />} />
			) : (
				<Button variant="link" color="white" leftIcon={<Icon as={icon} />}>
					{text}
				</Button>
			)}
		</Link>
	)
}
