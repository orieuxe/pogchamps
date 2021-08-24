import { Box, Flex, Icon, Table, Tbody, Td, Tfoot, Th, Thead, Tr, useBreakpointValue } from '@chakra-ui/react'
import { Participant } from '@models/participant'
import { getStats } from '@services/ChesscomService'
import { getAllParticipants } from '@services/ParticipantService'
import { getTournamentColor, getTournamentIds } from '@services/TournamentService'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { FaBolt, FaBullseye, FaCaretDown, FaCaretUp, FaClock, FaPuzzlePiece, FaUser } from 'react-icons/fa'
import { Column, useSortBy, useTable } from 'react-table'
import { useGlobal } from 'reactn'

interface Props {
	data: Participant[]
}

export default function Participants({ data }: Props): JSX.Element {
	const router = useRouter()
	const [tournament] = useGlobal('selectedTournament')

	const d = React.useMemo(
		() =>
			data.map((e) => {
				return {
					id: e.player.id,
					image: `/players/${e.player.twitch}.png`,
					twitch: e.player.twitch,
					username: e.player.username,
					rapid: e.player.stats?.chess_rapid?.last?.rating || 0,
					blitz: e.player.stats?.chess_blitz?.last?.rating || 0,
					bullet: e.player.stats?.chess_bullet?.last?.rating || 0,
					puzzle: e.player.stats?.tactics?.highest?.rating || 0,
				}
			}),
		[data]
	)

	const columns: Column[] = React.useMemo(
		() => [
			{
				Header: '',
				accessor: 'image',
				isImage: true,
				icon: FaUser,
				width: '48px',
			},
			{
				Header: 'Twitch',
				accessor: 'twitch',
				isNumeric: false,
				hiddeable: true,
			},
			{
				Header: 'Username',
				accessor: 'username',
				isNumeric: false,
				hiddeable: true,
			},
			{
				Header: 'Rapid',
				accessor: 'rapid',
				isNumeric: true,
				icon: FaClock,
				width: '48px',
				sortDescFirst: true,
			},
			{
				Header: 'Blitz',
				accessor: 'blitz',
				isNumeric: true,
				icon: FaBolt,
				width: '48px',
				sortDescFirst: true,
			},
			{
				Header: 'Bullet',
				accessor: 'bullet',
				isNumeric: true,
				icon: FaBullseye,
				width: '48px',
				sortDescFirst: true,
			},
			{
				Header: 'Puzzle',
				accessor: 'puzzle',
				isNumeric: true,
				icon: FaPuzzlePiece,
				width: '48px',
				sortDescFirst: true,
			},
		],
		[]
	)

	const onClick = (row: any) => {
		router.push(`/player/${tournament}/${row.twitch}`)
	}

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
		{
			columns,
			data: d,
			initialState: {
				sortBy: [
					{
						id: 'rapid',
						desc: true,
					},
				],
			},
		},
		useSortBy
	)
	const isSm = useBreakpointValue({ base: true, sm: false })

	return (
		<Box className="bg-color" marginTop="4">
			<Table {...getTableProps()} size="sm">
				<Thead>
					{headerGroups.map((headerGroup: any, i: number) => (
						<Tr {...headerGroup.getHeaderGroupProps()} key={i}>
							{headerGroup.headers.map((column: any, i: number) => (
								<Th
									padding={2}
									{...column.getHeaderProps(column.getSortByToggleProps())}
									key={i}
									hidden={column.hiddeable && isSm}
									width={column.width ? column.width : 'auto'}
									color={getTournamentColor(tournament)}
								>
									<Flex direction="row" alignItems="center" justify={column.isNumeric && 'center'}>
										{isSm ? <Icon as={column.icon} boxSize="4" /> : column.render('Header')}
										{column.isSorted ? (
											column.isSortedDesc ? (
												<Icon as={FaCaretUp} />
											) : (
												<Icon as={FaCaretDown} />
											)
										) : null}
									</Flex>
								</Th>
							))}
						</Tr>
					))}
				</Thead>
				<Tbody {...getTableBodyProps()}>
					{rows.map((row: any, i: number) => {
						prepareRow(row)
						return (
							<Tr {...row.getRowProps()} key={i} className="clickable" onClick={() => onClick(row.original)}>
								{row.cells.map((cell: any, i: number) => (
									<Td
										paddingX={isSm ? 1 : 2}
										{...cell.getCellProps()}
										key={i}
										hidden={cell.column.hiddeable && isSm}
										style={{ textAlign: cell.column.isNumeric && 'center' }}
									>
										{cell.column.isImage ? (
											<div
												style={{
													position: 'relative',
													height: cell.column.width,
												}}
											>
												<Image src={cell.value} layout="fill" objectFit="contain"></Image>
											</div>
										) : (
											cell.render('Cell')
										)}
									</Td>
								))}
							</Tr>
						)
					})}
				</Tbody>
				<Tfoot>
					{headerGroups.map((headerGroup: any, i: number) => (
						<Tr {...headerGroup.getHeaderGroupProps()} key={i}>
							{headerGroup.headers.map((column: any, i: number) => (
								<Th
									padding={2}
									{...column.getHeaderProps(column.getSortByToggleProps())}
									key={i}
									hidden={column.hiddeable && isSm}
									width={column.width ? column.width : 'auto'}
									color={getTournamentColor(tournament)}
								>
									<Flex direction="row" alignItems="center" justify={column.isNumeric && 'center'}>
										{isSm ? <Icon as={column.icon} boxSize="4" /> : column.render('Header')}
										{column.isSorted ? (
											column.isSortedDesc ? (
												<Icon as={FaCaretUp} />
											) : (
												<Icon as={FaCaretDown} />
											)
										) : null}
									</Flex>
								</Th>
							))}
						</Tr>
					))}
				</Tfoot>
			</Table>
		</Box>
	)
}

interface Params {
	params: {
		tournament: string
	}
}

export async function getStaticProps({ params }: Params) {
	const participants = await getAllParticipants(params.tournament)
	await Promise.all(
		participants.map(async (p: Participant, index: number, array: Participant[]) => {
			try {
				const stats = await getStats(p.player.username)
				array[index].player.stats = stats
			} catch (error) {
				console.error(error)
			}
		})
	)

	if (!participants) {
		return {
			notFound: true,
		}
	}

	return {
		props: { data: participants },
		revalidate: 30,
	}
}

export async function getStaticPaths() {
	const tournamentIds = getTournamentIds()
	return {
		paths: tournamentIds.map((e) => {
			return { params: { tournament: String(e) } }
		}),
		fallback: false,
	}
}
