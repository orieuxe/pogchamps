import { Component, OnInit, Input } from '@angular/core';
import {Match} from '../types';

@Component({
  selector: 'app-matchup',
  templateUrl: './matchup.component.html',
  styleUrls: ['./matchup.component.css']
})
export class MatchupComponent implements OnInit {
  @Input() match: Match;
  constructor() { }

  ngOnInit() {
  }

}
