import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Participant } from '../models/participant';
import { ParticipantService } from '../services/participant.service';
import { PlayerService } from '../services/player.service';
import { TournamentService } from '../services/tournament.service';

export interface ParticipantItem{
  username :string
  twitch :string
  rapid? :number
  blitz? :number
  bullet? :number
  puzzle? :number
}

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css', '../icons.css']
})

export class ParticipantsComponent implements OnInit {
  participants: Participant[];
  dataSource : MatTableDataSource<ParticipantItem>;
  displayedColumns: string[];
  statsLoading = true;

  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private playerService: PlayerService,
    private participantService: ParticipantService,
  ) { }

  ngOnInit() {
    const tournamentId = TournamentService.getTournamentId();
    this.participantService.getParticipants(tournamentId).subscribe(participants => {
      this.participants = participants
      this.dataSource = new MatTableDataSource(this.participants.map(p => ({
        username: p.player.username,
        twitch: p.player.twitch,
      }))); 
      this.displayColumns();
      this.loadStats();
    });
  }

  loadStats(){
    this.statsLoading = true;
    forkJoin(this.participants.map(p => this.playerService.getStats(p.player.username))).pipe(
      retry(3)
    ).subscribe(stats => {
      this.dataSource = new MatTableDataSource(this.participants.map((p,idx) => {
      const s = stats[idx];
      const rapid = s.chess_rapid;
      const blitz = s.chess_blitz;
      const bullet = s.chess_bullet
      return {
        username: p.player.username,
        twitch: p.player.twitch,
        rapid: rapid ? rapid.last.rating : null,
        rapid_games: rapid ? ParticipantsComponent.sum(rapid.record) : 0,
        blitz: blitz ? blitz.last.rating : null,
        blitz_games: blitz ? ParticipantsComponent.sum(blitz.record) : 0,
        bullet: bullet ? bullet.last.rating : null,
        bullet_games: bullet ? ParticipantsComponent.sum(bullet.record) : 0,
        puzzle: s.tactics && s.tactics.highest ? s.tactics.highest.rating : null
      }}));
      this.dataSource.sort = this.sort;
      this.displayColumns();
      this.statsLoading = false;
    })
  }
  
  @HostListener('window:resize')
  displayColumns(){
    this.displayedColumns = window.innerWidth > 1000 ?
      ['photo', 'twitch', 'username', 'rapid', 'rapid_games', 'blitz', 'blitz_games', 'bullet', 'bullet_games', 'puzzle']
    : ['photo', 'twitch', 'rapid', 'blitz', 'bullet', 'puzzle'];
  }

  private static sum(obj: any){
    return Object.values(obj).reduce((a: number, b: number) => a + b);
  }
}
