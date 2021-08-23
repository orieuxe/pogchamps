import { Participant } from '@models/participant';
import { defaultHeaders } from './BaseService';

export async function getAllParticipants(
  tournament: string | number
): Promise<Participant[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/participant/${tournament}/all`,
    defaultHeaders
  );
  return res.json();
}

export async function getParticipantsFrom(
  tournament: string | number,
  group: string
): Promise<Participant[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/participant/${tournament}/from/${group}`,
    defaultHeaders
  );
  return res.json();
}

export async function getParticipant(
  tournament: string | number,
  twitch: string
): Promise<Participant> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/participant/${tournament}/username/${twitch}`,
    defaultHeaders
  );
  return res.json();
}
