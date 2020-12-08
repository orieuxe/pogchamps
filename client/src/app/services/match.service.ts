import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Match } from '../models/match';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private _http: HttpClient) { }

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

  getTodayMatchs() {
    return this._http.get<Match[]>(`${environment.baseUrl}/duel/today`);
  }
}
