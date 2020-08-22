import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private _http: HttpClient) { }

  getStats(username : string) {
    return this._http.get(`http://localhost:4200/pub/player/${username}/stats`);
  }

  getPlayer(username : string) {
    return this._http.get(`http://localhost:4200/api/player/${username}`);
  }

  getPlayers() {
    return this._http.get(`http://localhost:4200/api/player/all`);
  }

  getPlayersFrom(group : string) {
    return this._http.get(`http://localhost:4200/api/player/from/${group}`);
  }
}
