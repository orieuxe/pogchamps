import { Player } from './player';

export interface Tournament {
   id: number;
   winner: Player;
   info_url: string;
   start_date: string;
   end_date: string;
}