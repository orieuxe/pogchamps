import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(private _http: HttpClient) {}

  getStats(username : string) {
    return this._http.get(`${environment.chessComUrl}/player/${username}/stats`);
  }

  getPlayer(username : string) {
    return this._http.get(`${environment.baseUrl}/player/${username}`);
  }

  getPlayers() {
    return this._http.get(`${environment.baseUrl}/player/all`);
  }

  getPlayersFrom(group : string) {
    return this._http.get(`${environment.baseUrl}/player/from/${group}`);
  }
}
