import { Box, Button, Flex, Link, Table, Tbody, Td, Th, Thead, Tr, useBreakpointValue } from '@chakra-ui/react'
import { Column, useTable } from 'react-table'

import Image from 'next/image'
import { Participant } from '@models/participant'
import React from 'react'
import { useRouter } from 'next/router'
import { useGlobal } from 'reactn'

interface Props {
	participants: Participant[]
}

function Standings({ participants }: Props) {
	const router = useRouter()
	const [selectedTournament] = useGlobal('selectedTournament')
	const currentGroup = participants[0].groupe
	const s = React.useMemo(
		() =>
			participants.map((p) => {
				return {
					id: p.player.id,
					image: `/players/${p.player.twitch}.png`,
					twitch: p.player.twitch,
					points: p.points,
					played: p.played,
				}
			}),
		[participants]
	)

	const columns: Column[] = React.useMemo(
		() => [
			{
				Header: () => (
					<Link href={`/group/${selectedTournament}/${currentGroup}`} style={{ textDecoration: 'none' }}>
						<Button colorScheme="purple" variant="outline">
							Group {currentGroup}
						</Button>
					</Link>
				),
				accessor: 'image',
				isImage: true,
				width: '48px',
			},
			{
				Header: 'Twitch',
				accessor: 'twitch',
				isNumeric: false,
			},
			{
				Header: 'Points',
				accessor: 'points',
				isNumeric: true,
				width: '24px',
			},
			{
				Header: 'Played',
				accessor: 'played',
				isNumeric: true,
				width: '24px',
				hiddeable: true,
			},
		],
		[]
	)

	const onClick = (row: any) => {
		router.push(`/player/${selectedTournament}/${row.twitch}`)
	}

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: s })

	const hideColumn = useBreakpointValue({ base: true, sm: false })

	return (
		<Box className="bg-color" marginTop="4">
			<Table {...getTableProps()} size="sm">
				<Thead>
					{headerGroups.map((headerGroup: any, i: number) => (
						<Tr {...headerGroup.getHeaderGroupProps()} key={i}>
							{headerGroup.headers.map((column: any, i: number) => (
								<Th
									padding={2}
									{...column.getHeaderProps()}
									isNumeric={column.isNumeric}
									key={i}
									width={column.width ? column.width : 'auto'}
									hidden={column.hiddeable && hideColumn}
								>
									<Flex direction="row" alignItems="center" justify={column.isNumeric ? 'end' : 'start'}>
										{column.render('Header')}
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
							<Tr {...row.getRowProps()} key={i} onClick={() => onClick(row.original)} className="clickable">
								{row.cells.map((cell: any, i: number) => (
									<Td
										style={{ textAlign: cell.column.isNumeric && 'center' }}
										paddingX={2}
										{...cell.getCellProps()}
										isNumeric={cell.column.isNumeric}
										key={i}
										hidden={cell.column.hiddeable && hideColumn}
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
			</Table>
		</Box>
	)
}

export default Standings
