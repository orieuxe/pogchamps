import Standings from '@components/Standings';
import { Participant } from '@models/participant';
import { getTournaments } from '@services/Tournaments';
import React from 'react';

interface Props {
  data: Participant[][];
}

export default function Participants({ data }: Props) {
  return (
    <div>
      {data.map((participants, i: number) => (
        <Standings
          key={i}
          participants={participants}
        ></Standings>
      ))}
    </div>
  );
}

interface Params {
  params: {
    tournament: string;
  };
}

export async function getStaticProps({ params }: Params) {
  const data: Participant[][] = [];
  const groupNames = ['A', 'B', 'C', 'D'];
  for (const g of groupNames) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/participant/${params.tournament}/from/${g}`,
      { mode: 'cors' }
    );
    data.push(await res.json());
  }
	

  if (data == []) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const tournaments = getTournaments();
  return {
    paths: tournaments.map((e) => {
      return { params: { tournament: String(e) } };
    }),
    fallback: false,
  };
}
