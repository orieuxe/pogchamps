import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import {HttpClientModule} from '@angular/common/http';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatListModule} from '@angular/material/list';


const routes = [
  {path: '', component : HomeComponent},
  {path: 'player/:username', component : PlayerComponent},
  // {path: 'games/:username', component : ListComponent},
  {path: 'group/:group', component : GroupComponent},
  // {path: 'group/:section', component : StandingsComponent},
  {path: 'game/:id', component : GameComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    GameComponent,
    ListComponent,
    StandingsComponent,
    GroupComponent,
    HomeComponent,
    BoardComponent,
    SmallBoardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatListModule,
    BrowserAnimationsModule
  ],
  providers: [PlayerService, GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
