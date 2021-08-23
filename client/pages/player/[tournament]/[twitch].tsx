import { Box, SimpleGrid } from '@chakra-ui/react';
import { Participant } from '@models/participant';
import { getTournaments } from '@services/Tournaments';
import React from 'react';

interface Props {
  data: Participant;
}

export default function Player({ data }: Props) {
  return (
    <SimpleGrid minChildWidth={310} spacing={10}>
      <Box>Profile of {data.player.twitch}</Box>
    </SimpleGrid>
  );
}

interface Params {
  params: {
    tournament: string;
    twitch: string;
  };
}

export async function getStaticProps({ params }: Params) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/participant/${params.tournament}/username/${params.twitch}`,
    { mode: 'cors' }
  );
  const data: Participant = await res.json();

  if (data == null) {
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

  const paths = {
    paths: await Promise.all(
      tournaments.map(async (e) => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API}/participant/${e}/all`,
          { mode: 'cors' }
        );
        const participants: Participant[] = await res.json();
        return participants.map((p) => {
          return {
            params: {
              tournament: String(e),
              twitch: p.player.twitch,
            },
          };
        });
      })
    ).then((nestedArrays: any[]) => [].concat(...nestedArrays)),
    fallback: false,
  };
  return paths;
}
