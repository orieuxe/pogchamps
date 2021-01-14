import { Component, OnInit } from '@angular/core';
import { TournamentService } from './services/tournament.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './theme.switch.css']
})
export class AppComponent implements OnInit{
  darkTheme: boolean;
  private dataThemeAttribute = 'data-theme';

  ngOnInit(): void {
    const darkThemeStr = localStorage.getItem(this.dataThemeAttribute) || 'false'
    const tournamentId = TournamentService.getTournamentId();
    const header = document.getElementsByTagName('header')[0];
    header.style.backgroundImage = `url('../assets/logo/background-${tournamentId}.png')`
    
    this.darkTheme = darkThemeStr === 'true';
    this.updateTheme(this.darkTheme);
  }
  
  updateTheme(dark: boolean){
    document.documentElement.setAttribute(this.dataThemeAttribute, dark ? 'dark' : 'light');
    localStorage.setItem(this.dataThemeAttribute, dark.toString());
  }
}
