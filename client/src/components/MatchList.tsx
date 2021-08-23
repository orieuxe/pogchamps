import { Match } from '@models/match';
import React from 'react';

interface Props {
  matchs: Match[];
  onMatchClick: (match: Match) => void;
}

function MatchList({ matchs, onMatchClick }: Props) {
  return (
    <ul>
      {matchs.map((match, i) => (
        <li key={i} onClick={() => onMatchClick(match)} className="clickable">
          {match.participant1.player.twitch} vs{' '}
          {match.participant2.player.twitch}
        </li>
      ))}
    </ul>
  );
}

export default MatchList;
