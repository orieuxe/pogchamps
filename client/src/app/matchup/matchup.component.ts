import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Match} from '../types';

@Component({
  selector: 'app-matchup',
  templateUrl: './matchup.component.html',
  styleUrls: ['./matchup.component.css']
})
export class MatchupComponent implements OnInit {
  @Input() match: Match;
  @Output() clickedMatch = new EventEmitter<Match>();

  status:string[] = ['',''];
  scores:Number[] = [0,0];
  constructor() { }

  ngOnInit() {
    if(this.match.result != null){
      this.scores = this.match.result.split("-").map(Number);
      if(this.scores[0] > this.scores[1]){
        this.status[0] = "winner";
      }else{
        this.status[1] = "winner";
      }
    }
  }

  onClick(match : Match){
    this.clickedMatch.emit(match);
  }

}
