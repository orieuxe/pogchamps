import { Component, OnInit } from '@angular/core';
import {PlayerService} from '../player.service';
import {GameService} from '../game.service';
import { tap, map, flatMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from "@angular/router";
import {Game, Player, Stats} from '../types';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  games : Game[]
  player : Player;
  constructor(private playerService: PlayerService,
              private gameService: GameService,
              private route : ActivatedRoute) { }

  ngOnInit() {
    let username = this.route.snapshot.paramMap.get("username");
    this.playerService.getPlayer(username).pipe(
        tap((p : Player) => this.player = p),
        flatMap(p => {
          this.gameService.getGamesFrom(p.username).subscribe((g : Game[]) => this.games = g);
          return this.playerService.getStats(p.username);
        }),
    ).subscribe((s : Stats) => this.player.stats = s);
  }
}
