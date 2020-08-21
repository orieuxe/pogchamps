import { Component, OnInit } from '@angular/core';
import {StatsService} from '../stats.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  constructor(private statsService: StatsService,
              private route : ActivatedRoute) { }

  ngOnInit() {
    let username = this.route.snapshot.paramMap.get("username");
    this.statsService.getStats(username).subscribe((res : any) => {
      console.log(res);
    });
  }
}
