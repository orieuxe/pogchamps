export interface Game {
  id: number;
  site: string;
  date: string;
  white: string;
  black: string;
  result: string;
  whiteelo: number;
  blackelo: number;
  timecontrol: string;
  eco: string;
  termination: string;
  length: number;
  moves: string;
}

export interface Move {
  san: string;
  idx: number;
}

export interface Player {
  twitch: string;
  username: string;
  group: string;
  points: number;
  winnerbracket: boolean;
}

export interface Stats {
  chess_blitz : Rating;
  chess_bullet : Rating;
  chess_rapid : Rating;
  fide : number;
  lessons : any;
  puzzle_rush : any;
  tactics : any;
}

export interface Rating {
  best : any;
  last : any;
  record : any;
}

export interface Match {
  id : number;
  player1 : Player;
  player2 : Player;
  date : string;
  round : string;
  games : Game[];
}
