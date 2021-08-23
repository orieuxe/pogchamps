import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGlobal } from 'reactn';

export default function Custom404() {
  const router = useRouter();
  const [selectedTournament] = useGlobal('selectedTournament')

  useEffect(() => {
    router.replace(`/participants/${selectedTournament}`);
  });

  return null;
}
