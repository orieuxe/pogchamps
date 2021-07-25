import {
	Box,
	Button,
	Center,
	Container,
	Flex,
	HStack,
	Icon,
	Image,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from '@chakra-ui/react'
import { FaCalendarAlt, FaCaretDown, FaCrown, FaGithub, FaListAlt, FaTwitter, FaUsers } from 'react-icons/fa'
import React, { useGlobal } from 'reactn'
import { ReactChild, ReactChildren } from 'react'

import Link from 'next/link'
import { getTournaments } from '@services/Tournaments'
import { useRouter } from 'next/router'

//import { BracketsIcon } from '@components/CustomIcons'

/* const Background = styled(Box)`
   min-height:100%;
   background-attachment: fixed;
   overflow-x:hidden
`
const NavSticky = styled(Nav)`
   position: -webkit-sticky;
   position: sticky;
   top:0;
   z-index:20;
   background-attachment: fixed;
`
const NoFlexImage = styled(Image)`
   flex: none;
`
const BoxTitle = styled(Box)`
   position: relative;
`
const Title = styled(NoFlexImage)`
   ${props => css`max-height:${props.theme.global!.size!.small};`}
   z-index: 21;
   pointer-events: none;
`
const BoxTitleMenu = styled(Box)`
   display:flex;
   margin:auto;
   position: absolute;
   max-width:516px;
   left:0;
   right:0;
   top:0;
   bottom:0;
`
const TitleMenu = styled(Menu)`
   position: absolute;
   right: calc(5% - 24px);
   top: calc(65% - 24px);
`
 */
type props = {
	children: ReactChild | ReactChildren
}
export default function PageWrapper(props: props): JSX.Element {
	const router = useRouter()
	const tournaments = getTournaments()
	const [selectedTournament, setSelectedTournament] = useGlobal('selectedTournament')

	/*useEffect(() => {
		//(router.asPath === '/schedule' || router.asPath === '/') &&
		//	selectedTournament === 0 &&
		if (tournaments.length > 0) {
			setSelectedTournament(tournaments[tournaments.length - 1].id)
		}
	}, [tournaments]) */

	//const hasLabel = size !== 'small'
	return (
		<Box background={`url(/backgrounds/Background3.svg)`} h="100vh" overflowY="scroll" backgroundSize="cover">
			<Container maxW={['full', '30em', '48em', '62em']}>
				<Box>
					<Flex w="full" direction="row" justify="space-between" align="center" marginY="4" wrap="wrap">
						<Box h="24px">
							<Image height="24px" src="/logos/Chesscom.svg" fit="contain" />
						</Box>
						<Center h="64px" width={['full', 'full', 'auto']} order={[1, 1, 0]}>
							<Box position="relative">
								<Image height="64px" src={`/logos/Pogchamps${selectedTournament}.svg`} fit="contain" />
								<Box position="absolute" right="8px" bottom="3">
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
															router.push(`/participants/${e}`)
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
						<HStack height="24px" spacing="4">
							<Icon as={FaGithub} color="white" />
							<Icon as={FaTwitter} color="white" />
						</HStack>
					</Flex>
				</Box>
				<Flex flexDirection="row" width="full" justify="space-between">
					<Link href="/">
						<Button variant="link" color="white" leftIcon={<Icon as={FaCalendarAlt} color="white" />}>
							Schedule
						</Button>
					</Link>

					<Link href={`/participants/${selectedTournament}`}>
						<Button variant="link" color="white" leftIcon={<Icon as={FaUsers} color="white" />}>
							participants
						</Button>
					</Link>

					<Link href={`/groupstage/${selectedTournament}`}>
						<Button variant="link" color="white" leftIcon={<Icon as={FaListAlt} color="white" />}>
							groupstage
						</Button>
					</Link>

					<Link href={`/brackets/${selectedTournament}`}>
						<Button variant="link" color="white" leftIcon={<Icon as={FaCrown} color="white" />}>
							brackets
						</Button>
					</Link>
				</Flex>

				{props.children}
			</Container>
		</Box>
	)
}
