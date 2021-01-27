import { Player } from './player';

export interface Tournament {
    id: number;
    winner: Player;
    info_url: string;
}