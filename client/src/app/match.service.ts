import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private _http: HttpClient) { }

  getMatchs() {
    return this._http.get(`${environment.baseUrl}/duel/all`);
  }

  getMatchsFrom(group : string) {
    return this._http.get(`${environment.baseUrl}/duel/from/${group}`);
  }

  getMatchsOf(playerId : number) {
    return this._http.get(`${environment.baseUrl}/duel/of/${playerId}`);
  }

  getTodayMatchs() {
    return this._http.get(`${environment.baseUrl}/duel/today`);
  }

  getMatchsFromStage(stage: string){
    return this._http.get(`${environment.baseUrl}/duel/stage/${stage}`);
  }
}
