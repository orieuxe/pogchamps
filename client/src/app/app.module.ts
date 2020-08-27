import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { NgVarDirective } from './ng-var.directive';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TimeagoModule } from 'ngx-timeago';

import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';

import {RouterModule} from '@angular/router';
import {PlayerService} from './player.service';
import {GameService} from './game.service';

import { GameComponent } from './game/game.component';
import { ListComponent } from './list/list.component';
import { StandingsComponent } from './standings/standings.component';
import { GroupComponent } from './group/group.component';
import { HomeComponent } from './home/home.component';
import { BoardComponent } from './board/board.component';
import { SmallBoardComponent } from './small-board/small-board.component';
import { MatchComponent } from './match/match.component';
import { MatchupComponent } from './matchup/matchup.component';
import { BracketComponent } from './bracket/bracket.component';
import { TodayComponent } from './today/today.component';



const routes = [
  {path: '', component : HomeComponent},
  {path: 'player/:username', component : PlayerComponent},
  {path: 'group/:group', component : GroupComponent},
  {path: 'game/:id', component : GameComponent},
  {path: 'bracket/:stage', component : BracketComponent},
  {path: 'today', component : TodayComponent},
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
    TodayComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatListModule,
    MatTableModule,
    MatGridListModule,
    BrowserAnimationsModule,
    TimeagoModule.forRoot()
  ],
  providers: [PlayerService, GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
