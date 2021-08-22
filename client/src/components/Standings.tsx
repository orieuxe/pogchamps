import {
  Box,
  Flex,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { Participant } from '@models/participant';
import Image from 'next/image';
import React from 'react';
import { FaUser } from 'react-icons/fa';
import { Column, useTable } from 'react-table';

interface Props {
  participants: Participant[];
}

function Standings({ participants }: Props) {
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
        Header: 'Points',
        accessor: 'points',
        isNumeric: true,
        width: '48px',
      },
      {
        Header: 'Played',
        accessor: 'played',
        isNumeric: true,
        width: '48px',
        hiddeable: true,
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: s });
  const bg = useColorModeValue('white', 'gray.800');
  const isSm = useBreakpointValue({ base: true, sm: false });

  return (
    <Box backgroundColor={bg} marginTop="4">
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
                  hidden={column.hiddeable && isSm}
                  width={column.width ? column.width : 'auto'}
                >
                  <Flex
                    direction="row"
                    alignItems="center"
                    justify={column.isNumeric ? 'end' : 'start'}
                  >
                    {isSm ? (
                      <Icon as={column.icon} boxSize="4" />
                    ) : (
                      column.render('Header')
                    )}
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
                      <div style={{ position: "relative", height: cell.column.width}} >
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
