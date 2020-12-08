import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Participant } from '../models/participant';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(private _http: HttpClient) {}

  getParticipant(tournamentId: number, username : string) {
    return this._http.get<Participant>(`${environment.baseUrl}/participant/${tournamentId}/username/${username}`);
  }

  getParticipants(tournamentId: number) {
    return this._http.get<Participant[]>(`${environment.baseUrl}/participant/${tournamentId}/all`);
  }

  getParticipantsFrom(group : string, tournamentId: number) {
    return this._http.get<Participant[]>(`${environment.baseUrl}/participant/${tournamentId}/from/${group}`);
  }
}
