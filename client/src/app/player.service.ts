import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private _http: HttpClient) {
    this.corsHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '/'
    });
  }

  getStats(username : string) {
    return this._http.get(`${environment.baseUrl}/pub/player/${username}/stats`);
  }

  getPlayer(username : string) {
    return this._http.get(`${environment.baseUrl}/api/player/${username}`);
  }

  getPlayers() {
    return this._http.get(`${environment.baseUrl}/api/player/all`);
  }

  getPlayersFrom(group : string) {
    return this._http.get(`${environment.baseUrl}/player/from/${group}`);
  }
}
