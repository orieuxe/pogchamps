import { Stats } from "./stats";

export interface Player {
  id: number;
  twitch: string;
  username: string;
  stats?: Stats;
}
