import { Component, OnInit } from '@angular/core';
import { Game } from "../models/game";
import { Match } from "../models/match";
import { MatchService } from '../services/match.service';
import { TournamentService } from '../services/tournament.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  games : Game[];
  matchs : Match[];

  minDate: Date;
  maxDate: Date;
  
  constructor(
    private matchService: MatchService,
    private tournamentService: TournamentService) { }

  ngOnInit() {
    this.tournamentService.getTournament(TournamentService.getTournamentId()).subscribe((tournament) => {
      this.minDate = new Date(tournament.start_date);
      this.maxDate = new Date(tournament.end_date);
    })

    this.getMatches(new Date());
  }

  showGames(match : Match){
    this.games = match.games;
  }

  getMatches(date: Date){
    this.matchService.getScheduledMatchs(date).subscribe((m : Match[]) => this.matchs = m);
  }
}
