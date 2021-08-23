import { Box, SimpleGrid } from '@chakra-ui/react';
import Standings from '@components/Standings';
import { Participant } from '@models/participant';
import { getParticipantsFrom } from '@services/Participant';
import { getTournaments } from '@services/Tournament';
import React from 'react';

interface Props {
  data: Participant[][];
}

export default function Participants({ data }: Props) {
  return (
    <SimpleGrid minChildWidth={310} spacing={10}>
      {data.map((participants, i: number) => (
        <Box key={i}>
          <Standings key={i} participants={participants}></Standings>
        </Box>
      ))}
    </SimpleGrid>
  );
}

interface Params {
  params: {
    tournament: string;
  };
}

export async function getStaticProps({ params }: Params) {
  const data: Participant[][] = [];
  const groupNames = ['A', 'B', 'C', 'D'];
  for (const g of groupNames) {
    data.push(await getParticipantsFrom(params.tournament, g));
  }

  if (data == []) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const tournaments = getTournaments();
  return {
    paths: tournaments.map((e) => {
      return { params: { tournament: String(e) } };
    }),
    fallback: false,
  };
}
