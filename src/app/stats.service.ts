import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private _http: HttpClient) { }

  getStats(username : string) {
    return this._http.get(`http://localhost:4200/api/player/${username}/stats`);
  }
}
