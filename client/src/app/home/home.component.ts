import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  groups: string[] = ['A', 'B', 'C', 'D'];
  constructor() { }

  ngOnInit() {
  }

}
