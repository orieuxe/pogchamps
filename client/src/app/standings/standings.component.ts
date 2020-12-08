import { Component, OnInit, Input } from '@angular/core';
import { Participant } from "../models/participant";
import {ParticipantService} from '../services/participant.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {
  displayedColumns: string[] = ['photo', 'twitch', 'points', 'played'];
  participants: Participant[];
  @Input() group: string;

  constructor(private participantService: ParticipantService){}

  ngOnInit() {
    this.participantService.getParticipantsFrom(this.group, 2).subscribe((p : Participant[]) => this.participants = p);
  }

}
