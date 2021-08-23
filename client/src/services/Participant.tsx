import { Participant } from "@models/participant";

export async function getAllParticipants(tournament: string|number): Promise<Participant[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/participant/${tournament}/all`,
    { mode: 'cors' }
  );
  return await res.json();
}

export async function getParticipantsFrom(tournament: string|number, group: string): Promise<Participant[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/participant/${tournament}/from/${group}`,
    { mode: 'cors' }
  );
  return await res.json();
}

export async function getParticipant(tournament: string|number, twitch: string): Promise<Participant> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/participant/${tournament}/username/${twitch}`,
    { mode: 'cors' }
  );
  return await res.json();
}