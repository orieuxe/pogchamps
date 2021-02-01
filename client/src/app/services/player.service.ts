import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Stats } from '../models/stats';
import { Player } from '../models/player';
import { delay, retry, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(private _http: HttpClient) {}

  getStats(username : string) {
    return this._http.get<Stats>(`${environment.chessComUrl}/player/${username.toLowerCase()}/stats`).pipe(
      retry(3),
      delay(1000)
    );
  }

  getPlayer(username : string) {
    return this._http.get<Player>(`${environment.baseUrl}/player/${username}`);
  }
}
