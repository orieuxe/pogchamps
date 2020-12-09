import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { flatMap, tap } from 'rxjs/operators';
import { Game } from "../models/game";
import { Match } from "../models/match";
import { Participant } from '../models/participant';
import { Player } from "../models/player";
import { Stats } from "../models/stats";
import { MatchService } from '../services/match.service';
import { ParticipantService } from '../services/participant.service';
import { PlayerService } from '../services/player.service';
import { TournamentService } from '../services/tournament.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  games : Game[];
  matchs : Match[];
  participant : Participant;
  stats : Stats;
  constructor(private playerService: PlayerService,
              private participantService: ParticipantService,
              private matchService: MatchService,
              private route : ActivatedRoute) { }

  ngOnInit() {
    const username = this.route.snapshot.paramMap.get("username");
    const tournamentId = TournamentService.getTournamentId();
    this.participantService.getParticipant(tournamentId, username).pipe(
        tap((p : Participant) => this.participant = p),
        flatMap(p => {
          this.matchService.getMatchsOf(p.id).subscribe((m : Match[]) => this.matchs = m);
          return this.playerService.getStats(p.player.username);
        }),
    ).subscribe((s : Stats) => this.stats = s);
  }

  showGames(match : Match){
    this.games = match.games;
  }
}
