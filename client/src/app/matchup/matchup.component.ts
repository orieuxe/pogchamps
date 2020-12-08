import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Match } from "../models/match";

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
    this.ngOnChanges();
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
      this.status = new Array<string>(3);
      this.scores = new Array<Number>(3);
    }
  }

  onClick(match : Match){
    this.clickedMatch.emit(match);
  }

  getUnix(match : Match){
    return new Date(match.date).getTime();
  }
}
