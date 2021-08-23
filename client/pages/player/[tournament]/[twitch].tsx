import { Box, Button, SimpleGrid, space, Tooltip } from '@chakra-ui/react';
import GameList from '@components/GameList';
import MatchList from '@components/MatchList';
import MyImage from '@components/MyImage';
import { Game } from '@models/game';
import { Match } from '@models/match';
import { Participant } from '@models/participant';
import { Stats } from '@models/stats';
import { getStats } from '@services/ChesscomService';
import { getMatchsOf } from '@services/MatchService';
import {
  getAllParticipants,
  getParticipant,
} from '@services/ParticipantService';
import { getTournaments } from '@services/TournamentService';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaBolt, FaBullseye, FaClock, FaTwitch } from 'react-icons/fa';

interface Props {
  participant: Participant;
  matchs: Match[];
  stats: Stats;
}

export default function Player({ participant, matchs, stats }: Props) {
  const [shownGames, setShownGames] = useState<Game[]>([]);
  const player = participant.player;

  return (
    <SimpleGrid minChildWidth={310} spacing={10}>
      <Box>
        <SimpleGrid minChildWidth={100} spacing={2}>
          <Box>
            <MyImage
              src={`/players/${player.twitch}.png`}
              width={200}
            ></MyImage>
          </Box>
          <Box style={{ fontSize: '1.2em' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
            >
              /{player.twitch}
              <a
                href={`https://www.twitch.tv/${player.twitch}`}
                target="_blank"
                rel="noreferrer"
              >
                <FaTwitch size={32} color="#b9a3e3" />
              </a>
              <a
                href={`https://www.chess.com/member/${player.username.toLowerCase()}`}
                target="_blank"
                rel="noreferrer"
              >
                <Image width={32} height={32} src="/icons/chess.svg" />
              </a>
            </div>
            <Button colorScheme="purple" marginBottom={3}>
              Group {participant.groupe || 'unknown'}
            </Button>
            <ul>
              {stats.chess_rapid && (
                <li style={{ display: 'flex', whiteSpace: 'nowrap' }}>
                  <Tooltip label="rapid rating">
                    <span style={{ marginRight: 5 }}>
                      <FaClock />
                    </span>
                  </Tooltip>
                  {stats.chess_rapid?.last?.rating} Best{' '}
                  {stats.chess_rapid?.best?.rating}
                </li>
              )}
              {stats.chess_blitz && (
                <li style={{ display: 'flex', whiteSpace: 'nowrap' }}>
                  <Tooltip label="blitz rating">
                    <span style={{ marginRight: 5 }}>
                      <FaBolt />
                    </span>
                  </Tooltip>
                  {stats.chess_blitz?.last?.rating} Best{' '}
                  {stats.chess_blitz?.best?.rating}
                </li>
              )}
              {stats.chess_bullet && (
                <li style={{ display: 'flex', whiteSpace: 'nowrap' }}>
                  <Tooltip label="bullet rating">
                    <span style={{ marginRight: 5 }}>
                      <FaBullseye />
                    </span>
                  </Tooltip>
                  {stats.chess_bullet?.last?.rating} Best{' '}
                  {stats.chess_bullet?.best?.rating}
                </li>
              )}
            </ul>
          </Box>
        </SimpleGrid>
        <MatchList
          matchs={matchs}
          onMatchClick={(match) => setShownGames(match.games)}
        ></MatchList>
      </Box>
      <Box>
        <GameList games={shownGames}></GameList>
      </Box>
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

  const matchs = await getMatchsOf(participant.id);
  const stats = await getStats(participant.player.username);

  return {
    props: { participant, matchs, stats },
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
            twitch: p.player.twitch,
          },
        }));
      })
    ).then((nestedArrays: any[]) => [].concat(...nestedArrays)),
    fallback: false,
  };
  return paths;
}
