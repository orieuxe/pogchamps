import { Component, OnInit } from '@angular/core';
import {GameService} from '../services/game.service';
import {MatchService} from '../services/match.service';
import { Game } from "../models/game";
import { Match } from "../models/match";

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {

  games : Game[];
  matchs : Match[];
  constructor(private matchService: MatchService) { }

  ngOnInit() {
    this.matchService.getTodayMatchs().subscribe((m : Match[]) => this.matchs = m);
  }

  showGames(match : Match){
    this.games = match.games;
  }

}
