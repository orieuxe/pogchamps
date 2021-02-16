import { Game } from "./game";
import { Participant } from './participant';


export interface Match {
  id: number;
  participant1: Participant;
  participant2: Participant;
  date: string;
  round: string;
  stage: string;
  result: string;
  games: Game[];
  next_duel: Match;
}
