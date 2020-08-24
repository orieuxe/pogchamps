import { Component, OnInit } from '@angular/core';
import {GameService} from '../game.service';
import {MatchService} from '../match.service';
import { ActivatedRoute, Router } from "@angular/router";
import {Game, Match} from '../types';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  games : Game[];
  matchs : Match[];
  group : string;
  constructor(private matchService: MatchService,
              private route : ActivatedRoute) { }

  ngOnInit() {
    this.group = this.route.snapshot.paramMap.get("group");
    this.matchService.getMatchsFrom(this.group).subscribe((m : Match[]) => this.matchs = m);

  }

  showGames(match : Match){
    this.games = match.games;
  }

}
