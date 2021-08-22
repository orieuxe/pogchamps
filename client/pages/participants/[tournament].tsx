import {
	Box,
	Flex,
	Icon,
	Table,
	Tbody,
	Td,
	Tfoot,
	Th,
	Thead,
	Tr,
	useBreakpointValue,
	useColorModeValue,
} from '@chakra-ui/react'
import { FaBolt, FaBullseye, FaCaretDown, FaCaretUp, FaClock, FaPuzzlePiece, FaUser } from 'react-icons/fa'
import { Column, useSortBy, useTable } from 'react-table'

import Image from 'next/image'
import { Participant } from '@models/participant'
import React from 'react'
import { getTournaments } from '@services/Tournaments'

interface Props {
	data: Participant[]
}

export default function Participants({ data }: Props): JSX.Element {
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
					puzzle: e.player.stats?.puzzle_rush?.best?.score || 0,
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
			},
			{
				Header: 'Blitz',
				accessor: 'blitz',
				isNumeric: true,
				icon: FaBolt,
				width: '48px',
			},
			{
				Header: 'Bullet',
				accessor: 'bullet',
				isNumeric: true,
				icon: FaBullseye,
				width: '48px',
			},
			{
				Header: 'Puzzle',
				accessor: 'puzzle',
				isNumeric: true,
				icon: FaPuzzlePiece,
				width: '48px',
			},
		],
		[]
	)

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
		{ columns, data: d },
		useSortBy
	)
	const bg = useColorModeValue('white', 'gray.800')
	const isSm = useBreakpointValue({ base: true, sm: false })

	return (
		<Box backgroundColor={bg} marginTop="4">
			<Table {...getTableProps()} size="sm">
				<Thead>
					{headerGroups.map((headerGroup: any) => (
						<Tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
							{headerGroup.headers.map((column: any, i: number) => (
								<Th
									padding={2}
									{...column.getHeaderProps(column.getSortByToggleProps())}
									isNumeric={column.isNumeric}
									key={i}
									hidden={column.hiddeable && isSm}
									width={column.width ? column.width : 'auto'}
								>
									<Flex direction="row" alignItems="center" justify={column.isNumeric ? 'end' : 'start'}>
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
					{rows.map((row: any) => {
						prepareRow(row)
						return (
							<Tr {...row.getRowProps()} key={row.id}>
								{row.cells.map((cell: any, i: number) => (
									<Td
										paddingX={isSm ? 1 : 2}
										{...cell.getCellProps()}
										isNumeric={cell.column.isNumeric}
										key={i}
										hidden={cell.column.hiddeable && isSm}
									>
										{cell.column.isImage ? (
											<Image src={cell.value} width="32px" height="32px"></Image>
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
					{headerGroups.map((headerGroup: any) => (
						<Tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
							{headerGroup.headers.map((column: any, i: number) => (
								<Th
									padding={2}
									{...column.getHeaderProps(column.getSortByToggleProps())}
									isNumeric={column.isNumeric}
									key={i}
									hidden={column.hiddeable && isSm}
									width={column.width ? column.width : 'auto'}
								>
									<Flex direction="row" alignItems="center" justify={column.isNumeric ? 'end' : 'start'}>
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
	const res = await fetch(`${process.env.NEXT_PUBLIC_API}/participant/${params.tournament}/all`, { mode: 'cors' })
	const data = await res.json()
	await Promise.all(
		data.map(async (p: Participant, index: number, array: Participant[]) => {
			try {
				const r = await fetch(`https://api.chess.com/pub/player/${p.player.username}/stats`)
				const stats = await r.json()
				array[index].player.stats = stats
			} catch (error) {
				console.error(error)
			}
		})
	)

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
