import { Component, OnInit, Input } from '@angular/core';
import { Game } from "../models/game";
import { Rating } from "../models/rating";
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() games : Game[]
  constructor() { }

  ngOnInit() {

  }



}
