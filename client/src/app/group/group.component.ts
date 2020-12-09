import { Component, OnInit } from '@angular/core';
import {GameService} from '../services/game.service';
import {MatchService} from '../services/match.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Game } from "../models/game";
import { Match } from "../models/match";
import { TournamentService } from '../services/tournament.service';

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
    const tournamentId = TournamentService.getTournamentId();
    this.matchService.getMatchsFrom(this.group, tournamentId).subscribe((m : Match[]) => this.matchs = m);
  }

  showGames(match : Match){
    this.games = match.games;
  }

}
