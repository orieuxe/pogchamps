import { Participant } from './models/participant';
import { Tournament } from '@models/tournament'
import 'reactn'

declare module 'reactn/default' {

   export interface State {
      themeMode: 'light' | 'dark',
      selectedTournament: number,
      tournaments:Tournament[],
   }
}

