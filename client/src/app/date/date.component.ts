import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnChanges {

  date: Date;
  @Input() strDate: string

  constructor() { }

  ngOnChanges() {
    this.date = new Date(this.strDate);
  }
}
