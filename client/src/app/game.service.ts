import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private _http: HttpClient) { }

  getGames() {
    return this._http.get(`http://localhost:4200/api/game/all`);
  }

  getGamesFrom(username : string) {
    return this._http.get(`http://localhost:4200/api/game/from/${username}`);
  }

  getGamesByGroup(group : string) {
    return this._http.get(`http://localhost:4200/api/game/group/${group}`);
  }

  getGame(id : number) {
    return this._http.get(`http://localhost:4200/api/game/${id}`);
  }
}
