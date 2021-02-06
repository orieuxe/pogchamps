import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {

  date: Date;
  @Input() strDate: string

  constructor() { }

  ngOnInit() {
    this.date = new Date(this.strDate);
  }
}
