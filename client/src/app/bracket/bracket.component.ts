import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Game } from "../models/game";
import { Match } from "../models/match";
import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.css']
})
export class BracketComponent implements OnInit {

  matchs : Match[];
  games : Game[];
  stage : string;
  constructor(private matchService: MatchService,
              private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.stage = params['stage'];
      this.matchService.getMatchsFromStage(this.stage, 2).subscribe((m : Match[]) => {
        this.matchs = m;
        this.games = [];
      });
    });
  }

  showGames(match : Match){
    this.games = match.games;
  }

}
