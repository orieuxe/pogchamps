import {
	Box,
	ButtonGroup,
	Center,
	Container,
	Flex,
	Icon,
	IconButton,
	Link,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	useColorMode,
} from '@chakra-ui/react'
import {
	FaCalendarAlt,
	FaCaretDown,
	FaCrown,
	FaGithub,
	FaListAlt,
	FaMoon,
	FaSun,
	FaTwitter,
	FaUsers,
} from 'react-icons/fa'
import React, { ReactChild, ReactChildren, useEffect, useState } from 'react'

import Image from 'next/image'
import NavLink from './NavLink'
import { getTournamentIds } from '@services/TournamentService'
import { useGlobal } from 'reactn'
import { useRouter } from 'next/router'
import useStorage from 'src/hooks/useStorage'

type props = {
	children: ReactChild | ReactChildren
}
export default function PageWrapper(props: props): JSX.Element {
	const router = useRouter()
	const tournamentIds = getTournamentIds()
	const [selectedTournament, setSelectedTournament] = useGlobal('selectedTournament')
	const { colorMode, toggleColorMode } = useColorMode()

	const { setItem, getItem } = useStorage()
	const [hasClickedOnTournamentList, setHasClickedOnTournamentList] = useState<boolean>(true)
	const hasClickedKey = 'hasClickedKey'

	useEffect(() => {
		const path = router.asPath
		const res = path.split('/')
		if (res.length > 2) {
			setSelectedTournament(Number(res[2]))
		}
		setHasClickedOnTournamentList(getItem(hasClickedKey) == 'true')
	}, [])

	return (
		<Box
			background={`url(/backgrounds/Background${selectedTournament}.svg)`}
			minH="100vh"
			backgroundSize="cover"
			backgroundAttachment="fixed"
			backgroundPosition="center"
		>
			<Container maxW={['full', '40em', '48em', '64em']} padding="2">
				<Flex
					w="full"
					direction="row"
					justify="space-between"
					align="center"
					marginTop="4"
					marginBottom="2"
					wrap="wrap"
				>
					<Box h="24px">
						<Image height="24px" width="100px" src="/logos/Chesscom.svg" />
					</Box>
					<Center h="64px" width={['full', 'auto']} order={[1, 0]}>
						<Box position="relative" width="288px">
							<Image height="64px" width="256px" src={`/logos/Pogchamps.svg`} />
							<Box position="absolute" right="0" top="0" zIndex="2">
								<Image height="32px" width="32px" src={`/logos/Pogchamps${selectedTournament}.svg`} />
							</Box>
							<Box position="absolute" right="1%" bottom="25%" zIndex="2">
								<Menu isLazy id="1">
									<MenuButton
										onClick={() => {
											setItem(hasClickedKey, 'true')
											setHasClickedOnTournamentList(true)
										}}
									>
										<Icon
											as={FaCaretDown}
											color="white"
											className={hasClickedOnTournamentList ? '' : 'up-down'}
										/>
									</MenuButton>
									<MenuList>
										{tournamentIds.map((e, i) => {
											return (
												<MenuItem
													key={i}
													onClick={() => {
														setSelectedTournament(e)
														const path = router.asPath
														const newPath = path.replace(String(selectedTournament), String(e))
														if (path != newPath) {
															router.push(newPath)
														}
													}}
												>
													Edition {e}
												</MenuItem>
											)
										})}
									</MenuList>
								</Menu>
							</Box>
						</Box>
					</Center>
					<ButtonGroup height="24px" isAttached>
						<IconButton
							aria-label="Toggle theme"
							variant="link"
							icon={<Icon as={colorMode === 'light' ? FaMoon : FaSun} />}
							onClick={toggleColorMode}
						/>
						<Link href="https://github.com/orieuxe/pogchamps" target="_blank" rel="noreferrer">
							<IconButton href aria-label="Github" variant="link" icon={<Icon as={FaGithub} />} color="white" />
						</Link>
						<Link href="https://twitter.com/chesscom" target="_blank" rel="noreferrer">
							<IconButton aria-label="Twitter" variant="link" icon={<Icon as={FaTwitter} />} color="white" />
						</Link>
					</ButtonGroup>
				</Flex>
				<Flex
					flexDirection="row"
					width="full"
					justify="space-between"
					position="sticky"
					top="0"
					paddingY="2"
					background={`url(/backgrounds/Background${selectedTournament}.svg)`}
					backgroundSize="cover"
					backgroundAttachment="fixed"
					backgroundPosition="center"
					zIndex="1"
				>
					<NavLink text="Schedule" href={'/'} icon={FaCalendarAlt} />
					<NavLink text="Participants" href={`/participants/${selectedTournament}`} icon={FaUsers} />
					<NavLink text="Groupstage" href={`/groupstage/${selectedTournament}`} icon={FaListAlt} />
					<NavLink text="Brackets" href={`/brackets/${selectedTournament}`} icon={FaCrown} />
				</Flex>

				{props.children}
			</Container>
		</Box>
	)
}
