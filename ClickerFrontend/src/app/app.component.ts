import { Component } from '@angular/core';
import { ClickComponent } from './pages/click/click.component';
import { UpgradesComponent } from './pages/upgrades/upgrades.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ClickerFrontend';
}
