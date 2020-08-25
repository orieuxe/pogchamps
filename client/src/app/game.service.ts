import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private _http: HttpClient) { }

  getGames() {
    return this._http.get(`${environment.baseUrl}/api/game/all`);
  }

  getGamesFrom(username : string) {
    return this._http.get(`${environment.baseUrl}/api/game/from/${username}`);
  }

  getGamesByGroup(group : string) {
    return this._http.get(`${environment.baseUrl}/api/game/group/${group}`);
  }

  getGame(id : number) {
    return this._http.get(`${environment.baseUrl}/api/game/${id}`);
  }
}
