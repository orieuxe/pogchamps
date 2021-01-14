import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatSortModule, MatTooltipModule } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TimeagoModule } from 'ngx-timeago';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { BracketComponent } from './bracket/bracket.component';
import { NgVarDirective } from './directives/ng-var.directive';
import { GameComponent } from './game/game.component';
import { GroupComponent } from './group/group.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { MatchComponent } from './match/match.component';
import { MatchupComponent } from './matchup/matchup.component';
import { PlayerComponent } from './player/player.component';
import { GameService } from './services/game.service';
import { PlayerService } from './services/player.service';
import { SmallBoardComponent } from './small-board/small-board.component';
import { StandingsComponent } from './standings/standings.component';
import { TodayComponent } from './today/today.component';
import { TournamentComponent } from './tournament/tournament.component';
import { ParticipantsComponent } from './participants/participants.component';


const routes = [
  {path: '', component : HomeComponent},
  {path: 'player/:username', component : PlayerComponent},
  {path: 'group/:group', component : GroupComponent},
  {path: 'game/:id', component : GameComponent},
  {path: 'bracket/:stage', component : BracketComponent},
  {path: 'today', component : TodayComponent},
  {path: 'participants', component : ParticipantsComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    NgVarDirective,
    GameComponent,
    ListComponent,
    StandingsComponent,
    GroupComponent,
    HomeComponent,
    BoardComponent,
    SmallBoardComponent,
    MatchComponent,
    BracketComponent,
    MatchupComponent,
    TodayComponent,
    TournamentComponent,
    ParticipantsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatListModule,
    MatSortModule,
    MatTableModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatSelectModule,
    BrowserAnimationsModule,
    TimeagoModule.forRoot()
  ],
  exports:[
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [PlayerService, GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
