import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tournament } from '../models/tournament';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  private static tournamentId = 'tournamentId';

  constructor(private _http: HttpClient) {}

  getTournaments() {
    return this._http.get<Tournament[]>(`${environment.baseUrl}/tournament/all`);
  }

  getTournament(id: number) {
    return this._http.get<Tournament>(`${environment.baseUrl}/tournament/${id}`);
  }

  public static getTournamentId(): number {
    return parseInt(localStorage.getItem(this.tournamentId), 10) || 3;
  }

  public static setTournamentId(id: number): void {
    localStorage.setItem(this.tournamentId, id.toString());
  }
}
