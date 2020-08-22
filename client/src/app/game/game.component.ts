import { Component, OnInit } from '@angular/core';
import {GameService} from '../game.service';
import { ActivatedRoute, Router } from "@angular/router";
import {Game, Player, Stats} from '../types';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

    game : Game;
    constructor(private gameService: GameService,
                private route : ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get("id");
    this.gameService.getGame(Number(id)).subscribe((g : Game) => this.game = g);
  }

}
