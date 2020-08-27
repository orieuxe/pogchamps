import { Component, OnInit } from '@angular/core';
import {GameService} from '../game.service';
import {MatchService} from '../match.service';
import {Game, Match} from '../types';

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
