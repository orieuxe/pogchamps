import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private _http: HttpClient) { }

  getMatchs() {
    return this._http.get(`http://localhost:4200/api/duel/all`);
  }

  getMatchsFrom(group : string) {
    return this._http.get(`http://localhost:4200/api/duel/from/${group}`);
  }

  getMatchsOf(playerId : number) {
    return this._http.get(`http://localhost:4200/api/duel/of/${playerId}`);
  }

  getTodayMatchs() {
    return this._http.get(`http://localhost:4200/api/duel/today`);
  }
}
