import { Component, OnInit } from '@angular/core';
import {Match, Game} from '../types';
import {MatchService} from '../match.service';
import { ActivatedRoute, Router } from "@angular/router";

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
      this.matchService.getMatchsFromStage(this.stage).subscribe((m : Match[]) => {
        this.matchs = m;
        this.games = [];
      });
    });
  }

  showGames(match : Match){
    this.games = match.games;
  }

}
