import { HostListener, Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Game } from "../models/game";
import { Move } from "../models/move";
import * as Chess from 'chess.js';

declare var ChessBoard : any;

@Component({
  selector: 'app-small-board',
  templateUrl: './small-board.component.html',
  styleUrls: ['./small-board.component.css']
})
export class SmallBoardComponent implements OnInit {
  chess: Chess;
  board:any;
  @Input() game: Game;

  constructor() { }

  ngOnInit() {
    this.chess = new Chess();
    this.chess.load_pgn(this.game.moves);

    setTimeout(() => {
      this.board = ChessBoard('board-'+this.game.id, {
        position: this.chess.fen(),
        draggable: false,
        orientation: "white",
        showNotation : false
      })
    }, 0);
  }

  setTimeControl(timecontrol : string){
    let minSec = timecontrol.split("+").map(Number);
    minSec[0] = minSec[0]/60;
    if(minSec.length < 2) minSec.push(0);
    return minSec.join("+")
  }
}
