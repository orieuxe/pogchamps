import { Rating } from './rating';

export interface Stats {
   id: number;
   chess_blitz?: Rating;
   chess_bullet?: Rating;
   chess_rapid?: Rating;
   fide: number;
   lessons: any;
   puzzle_rush: any;
   tactics: any;
}
