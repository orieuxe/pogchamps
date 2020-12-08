import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private _http: HttpClient) { }

  getGames() {
    return this._http.get<Game[]>(`${environment.baseUrl}/game/all`);
  }

  getGame(id : number) {
    return this._http.get<Game>(`${environment.baseUrl}/game/${id}`);
  }
}
