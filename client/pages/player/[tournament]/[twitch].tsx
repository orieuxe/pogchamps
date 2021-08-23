import { Box, SimpleGrid } from '@chakra-ui/react';
import { Participant } from '@models/participant';
import { getAllParticipants, getParticipant } from '@services/Participant';
import { getTournaments } from '@services/Tournament';
import React from 'react';

interface Props {
  participant: Participant;
}

export default function Player({ participant }: Props) {
  return (
    <SimpleGrid minChildWidth={310} spacing={10}>
      <Box>Profile of {participant.player.twitch}</Box>
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
  const participant = await getParticipant(params.tournament, params.twitch);

  if (participant == null) {
    return {
      notFound: true,
    };
  }

  return {
    props: { participant },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const tournaments = getTournaments();

  const paths = {
    paths: await Promise.all(
      tournaments.map(async (e) => {
        const participants: Participant[] = await getAllParticipants(e);
        return participants.map((p) => ({
          params: {
            tournament: String(e),
            twitch: p.player.twitch
          }
        }));
      })
    ).then((nestedArrays: any[]) => [].concat(...nestedArrays)),
    fallback: false,
  };
  return paths;
}
