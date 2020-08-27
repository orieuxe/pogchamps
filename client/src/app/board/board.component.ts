import { HostListener, Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Game, Move} from '../types';
import * as Chess from 'chess.js';

declare var ChessBoard : any;

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  chess: Chess;
  moves: string[];
  clocks: string[];
  color: string;
  board:any;
  moveIdx: number = 0;
  @Input() game: Game;

  constructor() {}

  ngOnInit() {
    this.chess = new Chess();
    this.moves = this.game.moves.split(' ');
    this.clocks = this.game.clocks.split(' ');

    let initialTime = Number(this.game.timecontrol.split('+')[0])/60
    this.clocks.unshift(initialTime + ':00.0');
    this.clocks.unshift(initialTime + ':00.0');
    console.log(this.clocks);


    this.color = "white";

    setTimeout(() => {
      this.board = ChessBoard('board-'+this.game.id, {
        position: this.chess.fen(),
        draggable: true,
        orientation: this.color,
        onDrop:this.onDrop.bind(this)
      });
    }, 0);
  }

  onDrop (source, target) {

    // see if the move is legal
    var move = this.chess.move({
      from: source,
      to: target,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    })

    // illegal move
    if (move === null) return 'snapback'

    this.board.position(this.chess.fen());

    this.moveIdx++
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch(event.key) {
       case 'ArrowUp': {
          this.goToMove(0);
          break;
       }
       case 'ArrowDown': {
          this.goToMove(this.moves.length)
          break;
       }
       case 'ArrowLeft': {
          this.goToMove(this.moveIdx-1)
          break;
       }
       case 'ArrowRight': {
          this.goToMove(this.moveIdx+1)
          break;
       }
       default: {
          break;
       }
    }
  }

  goToMove(idx){
    if(idx < 0 || idx > this.moves.length) return;
    if(idx == 0){
      this.chess.reset();
      this.moveIdx = idx;
    }
    while (this.moveIdx < idx) {
      this.chess.move(this.moves[this.moveIdx++]);
    }
    while(this.moveIdx > idx){
      this.chess.undo();
      this.moveIdx--;
    }

    this.board.position(this.chess.fen());
  }

  makeMove(move){
    this.chess.move(move);
    this.board.position(this.chess.fen());
    this.moveIdx++;
  }
}
