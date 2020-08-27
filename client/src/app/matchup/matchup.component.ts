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

  status:string[];
  scores:Number[];
  constructor() {}

  ngOnInit(){
    this.status = new Array<string>(3);
    this.scores = new Array<Number>(3);
  }

  ngOnChanges() {
    if(this.match.result != null){
      this.scores = this.match.result.split("-").map(Number);
      if(this.scores[0] > this.scores[1]){
        this.status = ["winner",''];
      }else{
        this.status = ['',"winner"];
      }
    }else{
      this.status = ['', ''];
      this.scores = [0, 0];
    }
  }

  onClick(match : Match){
    this.clickedMatch.emit(match);
  }

}
