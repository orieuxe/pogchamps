import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {StatsService} from './stats.service';

const routes = [
  {path: 'player/:username', component : PlayerComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [StatsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
