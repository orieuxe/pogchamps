import { Component, OnInit, Input } from '@angular/core';
import {Player} from '../types';
import {PlayerService} from '../player.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {
  displayedColumns: string[] = ['photo', 'twitch', 'points', 'played'];
  players: Player[];
  @Input() group: string;

  constructor(private playerService: PlayerService){}

  ngOnInit() {
    this.playerService.getPlayersFrom(this.group).subscribe((p : Player[]) => this.players = p);
  }

}
