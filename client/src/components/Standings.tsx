import { Box, Flex, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { Participant } from '@models/participant';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { Column, useTable } from 'react-table';

interface Props {
  participants: Participant[];
}

function Standings({ participants }: Props) {
  const router = useRouter();
  const { tournament } = router.query
  const s = React.useMemo(
    () =>
      participants.map((p) => {
        return {
          id: p.player.id,
          image: `/players/${p.player.twitch}.png`,
          twitch: p.player.twitch,
          points: p.points,
          played: p.played,
        };
      }),
    [participants]
  );

  const columns: Column[] = React.useMemo(
    () => [
      {
        Header: '',
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
        width: '24px'
      },
      {
        Header: 'Played',
        accessor: 'played',
        isNumeric: true,
        width: '24px',
      },
    ],
    []
  );

  const onClick = (row: any) => {
    router.push(`/player/${tournament}/${row.twitch}`);
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: s });

  return (
    <Box className="bg-color" marginTop="4">
      <Table {...getTableProps()} size="sm">
        <Thead>
          {headerGroups.map((headerGroup: any) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column: any, i: number) => (
                <Th
                  padding={2}
                  {...column.getHeaderProps()}
                  isNumeric={column.isNumeric}
                  key={i}
                  width={column.width ? column.width : 'auto'}
                >
                  <Flex
                    direction="row"
                    alignItems="center"
                    justify={column.isNumeric ? 'end' : 'start'}
                  >
                    {column.render('Header')}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row: any) => {
            prepareRow(row);
            return (
              <Tr
                {...row.getRowProps()}
                key={row.id}
                onClick={() => onClick(row.original)}
                className="clickable"
              >
                {row.cells.map((cell: any, i: number) => (
                  <Td style={{textAlign: cell.column.isNumeric && 'center'}}
                    paddingX={2}
                    {...cell.getCellProps()}
                    isNumeric={cell.column.isNumeric}
                    key={i}
                  >
                    {cell.column.isImage ? (
                      <div
                        style={{
                          position: 'relative',
                          height: cell.column.width,
                        }}
                      >
                        <Image
                          src={cell.value}
                          layout="fill"
                          objectFit="contain"
                        ></Image>
                      </div>
                    ) : (
                      cell.render('Cell')
                    )}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}

export default Standings;