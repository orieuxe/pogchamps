import { Component, OnInit } from '@angular/core';
import {PlayerService} from '../player.service';
import {GameService} from '../game.service';
import {MatchService} from '../match.service';
import { tap, map, flatMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from "@angular/router";
import {Game, Player, Stats, Match} from '../types';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  games : Game[];
  matchs : Match[];
  player : Player;
  stats : Stats;
  constructor(private playerService: PlayerService,
              private gameService: GameService,
              private matchService: MatchService,
              private route : ActivatedRoute) { }

  ngOnInit() {
    let username = this.route.snapshot.paramMap.get("username");
    this.playerService.getPlayer(username).pipe(
        tap((p : Player) => this.player = p),
        flatMap(p => {
          this.matchService.getMatchsOf(p.id).subscribe((m : Match[]) => this.matchs = m);
          return this.playerService.getStats(p.username);
        }),
    ).subscribe((s : Stats) => this.stats = s);
  }

  showGames(match : Match){
    this.games = match.games;
  }
}
