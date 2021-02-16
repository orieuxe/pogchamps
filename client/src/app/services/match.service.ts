import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Match } from '../models/match';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(
    private _http: HttpClient,
    private datepipe: DatePipe) { }

  getMatchs() {
    return this._http.get<Match[]>(`${environment.baseUrl}/duel/all`);
  }

  getMatchsFrom(group : string, tournamentId: number) {
    return this._http.get<Match[]>(`${environment.baseUrl}/duel/${tournamentId}/from/${group}`);
  }

  getMatchsFromStage(stage: string, tournamentId: number){
    return this._http.get<Match[]>(`${environment.baseUrl}/duel/${tournamentId}/stage/${stage}`);
  }

  getMatchsOf(participantId : number) {
    return this._http.get<Match[]>(`${environment.baseUrl}/duel/of/${participantId}`);
  }

  getScheduledMatchs(date: Date) {
    const strDate = this.datepipe.transform(date, 'yyyy-MM-dd')
    return this._http.get<Match[]>(`${environment.baseUrl}/duel/schedule/${strDate}`);
  }
}
