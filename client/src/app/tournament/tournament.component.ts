import { Component, OnInit } from '@angular/core';
import { Tournament } from '../models/tournament';
import { TournamentService } from '../services/tournament.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {
  tournaments: Tournament[];
  tournamentId = TournamentService.getTournamentId().toString();

  constructor(private tournamentService: TournamentService) { }

  ngOnInit() {
    this.tournamentService.getTournaments().subscribe((res) => this.tournaments = res);
  }

  changeTournamentId(id: number) {
    TournamentService.setTournamentId(id);
    window.location.reload();
  }
}
