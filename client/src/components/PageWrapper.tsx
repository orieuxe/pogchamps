import {
	Box,
	ButtonGroup,
	Center,
	Container,
	Flex,
	Icon,
	IconButton,
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
import React, { ReactChild, ReactChildren } from 'react'

import Image from 'next/image'
import NavLink from './NavLink'
import { getTournaments } from '@services/Tournaments'
import { useGlobal } from 'reactn'
import { useRouter } from 'next/router'

type props = {
	children: ReactChild | ReactChildren
}
export default function PageWrapper(props: props): JSX.Element {
	const router = useRouter()
	const tournaments = getTournaments()
	const [selectedTournament, setSelectedTournament] = useGlobal('selectedTournament')
	const { colorMode, toggleColorMode } = useColorMode()

	return (
		<Box
			background={`url(/backgrounds/Background3.svg)`}
			minH="100vh"
			backgroundSize="cover"
			backgroundAttachment="fixed"
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
						<Box position="relative">
							<Image height="64px" width="250px" src={`/logos/Pogchamps${selectedTournament}.svg`} />
							<Box position="absolute" right="1%" bottom="25%" zIndex="2">
								<Menu>
									<MenuButton>
										<Icon as={FaCaretDown} color="white" />
									</MenuButton>
									<MenuList>
										{tournaments.map((e, i) => {
											return (
												<MenuItem
													key={i}
													onClick={() => {
														setSelectedTournament(e)
														const path = router.asPath
														const newPath = path.replace(String(selectedTournament), String(e));
														if(path != newPath) {
															router.push(newPath)
														};
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
						<IconButton aria-label="Github" variant="link" icon={<Icon as={FaGithub} />} color="white" />
						<IconButton aria-label="Twitter" variant="link" icon={<Icon as={FaTwitter} />} color="white" />
					</ButtonGroup>
				</Flex>
				<Flex
					flexDirection="row"
					width="full"
					justify="space-between"
					position="sticky"
					top="0"
					paddingY="2"
					background={`url(/backgrounds/Background3.svg)`}
					backgroundSize="cover"
					backgroundAttachment="fixed"
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
