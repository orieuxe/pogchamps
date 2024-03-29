import { Flex, Table, Tbody, Td, Th, Thead, Tr, useBreakpointValue, useColorModeValue } from '@chakra-ui/react'
import { Participant } from '@models/participant'
import { getTournamentColor } from '@services/TournamentService'
import { useRouter } from 'next/router'
import React from 'react'
import { Column, useTable } from 'react-table'
import { useGlobal } from 'reactn'
import { GroupButton } from './GroupButton'
import MyImage from './MyImage'

interface Props {
	participants: Participant[]
}

function Standings({ participants }: Props) {
	const router = useRouter()
	const [selectedTournament] = useGlobal('selectedTournament')
	const currentGroup = participants[0]?.groupe
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
				Header: () => <GroupButton group={currentGroup} selectedTournament={selectedTournament} />,
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
	const headerColor = useColorModeValue('black', getTournamentColor(selectedTournament))

	return (
		<Table {...getTableProps()} size="sm" className="bg-color" boxShadow="lg" rounded="lg">
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
								color={headerColor}
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
									paddingY={1}
									{...cell.getCellProps()}
									isNumeric={cell.column.isNumeric}
									key={i}
									hidden={cell.column.hiddeable && hideColumn}
								>
									{cell.column.isImage ? (
										<MyImage src={cell.value} width={cell.column.width} />
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
	)
}

export default Standings
