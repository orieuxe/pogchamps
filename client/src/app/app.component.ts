import { Component, OnInit } from '@angular/core';

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
    this.darkTheme = darkThemeStr === 'true';
    this.updateTheme(this.darkTheme);
  }
  
  updateTheme(dark: boolean){
    document.documentElement.setAttribute(this.dataThemeAttribute, dark ? 'dark' : 'light');
    localStorage.setItem(this.dataThemeAttribute, dark.toString());
  }
}
