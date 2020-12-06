import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './theme.switch.css']
})
export class AppComponent {
  title = 'pogchamps';

  switchTheme(dark: boolean){
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }
}
