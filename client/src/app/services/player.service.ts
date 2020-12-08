import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Stats } from '../models/stats';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(private _http: HttpClient) {}

  getStats(username : string) {
    return this._http.get<Stats>(`${environment.chessComUrl}/player/${username}/stats`);
  }

  getPlayer(username : string) {
    return this._http.get<Player>(`${environment.baseUrl}/player/${username}`);
  }
}
