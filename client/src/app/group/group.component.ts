import { Component, OnInit } from '@angular/core';
import {GameService} from '../game.service';
import { ActivatedRoute, Router } from "@angular/router";
import {Game} from '../types';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  games : Game[];
  group : string;
  constructor(private gameService: GameService,
              private route : ActivatedRoute) { }

  ngOnInit() {
    this.group = this.route.snapshot.paramMap.get("group");
    this.gameService.getGamesByGroup(this.group).subscribe((g : Game[]) => this.games = g);
  }

}
