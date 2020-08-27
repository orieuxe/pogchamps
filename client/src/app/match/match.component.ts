import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Match} from '../types'
import { TimeagoModule } from 'ngx-timeago';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  @Input() matchs: Match[];
  @Output() clickedMatch = new EventEmitter<Match>();

  constructor() { }

  ngOnInit() {
    console.log(new Date(this.matchs[0].date).getTime());

  }

  onClick(match : Match){
    this.clickedMatch.emit(match);
  }

  getUnix(match : Match){
    return new Date(match.date).getTime();
  }
}
