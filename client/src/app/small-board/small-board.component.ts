import { HostListener, Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Game, Move} from '../types';
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
    return minSec.join("+")
  }

}
