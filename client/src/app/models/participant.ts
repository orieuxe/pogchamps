import { Player } from './player';
import { Tournament } from './tournament';

export interface Participant{
    id: number;
    player: Player;
    tournament: Tournament;
    groupe: string;
    played: number;
    points: number;
}