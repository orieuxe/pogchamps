import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Match} from '../types'
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
  }

  onClick(match : Match){
    this.clickedMatch.emit(match);
  }
}
