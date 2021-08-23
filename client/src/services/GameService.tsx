import { Game } from '@models/game';
import { defaultHeaders } from './BaseService';

export async function getGames(): Promise<Game[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/game/all`,
    defaultHeaders
  );
  return res.json();
}

export async function getGame(id: number): Promise<Game[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/game/${id}`,
    defaultHeaders
  );
  return res.json();
}
